// gen-single-file.ts
import fs from 'fs/promises';
import path from 'path';
import prettier from 'prettier';
import _ from 'lodash';
import { execSync } from 'child_process'

const NAMESPACE = 'jenna-mcp';
const OPENAPI_URL = 'https://cld-dkr-prod-jenna-mcp.wibudev.com/docs/json';

const namespaceCase = _.startCase(_.camelCase(NAMESPACE)).replace(/ /g, '');
const OUT_DIR = path.join('src', 'nodes');
const OUT_FILE = path.join(OUT_DIR, `${namespaceCase}.node.ts`);
const CREDENTIAL_NAME = 'wibuApi';


interface OpenAPI {
    paths: Record<string, any>;
    components?: any;
    tags?: { name: string }[];
}

// helpers
const safe = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '_');

// load OpenAPI
async function loadOpenAPI(): Promise<OpenAPI> {
    const url = OPENAPI_URL
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch OpenAPI: ${res.status} ${res.statusText}`);
    return res.json() as Promise<OpenAPI>;
}

// convert operation to value
function operationValue(tag: string, operationId: string) {
    return `${safe(tag)}_${safe(operationId)}`;
}

// build properties for dropdown + dynamic inputs
function buildPropertiesBlock(ops: Array<any>) {
    const options = ops.map((op) => {
        const value = operationValue(op.tag, op.operationId);
        const label = `${NAMESPACE} ${op.tag} ${op.operationId}`;
        return `{ name: '${label}', value: '${value}', description: ${JSON.stringify(
            op.summary || op.description || '',
        )}, action: '${label}' }`;
    });

    const dropdown = `
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      options: [
        ${options.join(',\n        ')}
      ],
      default: '${operationValue(ops[0].tag, ops[0].operationId)}',
      description: 'Pilih endpoint yang akan dipanggil'
    }
  `;

    const dynamicProps: string[] = [];

    for (const op of ops) {
        const value = operationValue(op.tag, op.operationId);

        // Query fields
        for (const name of op.query ?? []) {
            dynamicProps.push(`
      {
        displayName: 'Query ${name}',
        name: 'query_${name}',
        type: 'string',
        default: '',
        placeholder: '${name}',
        description: '${name}',
        displayOptions: { show: { operation: ['${value}'] } }
      }`);
        }

        // Body fields (required only)
        const bodyRequired = op.body?.required ?? [];
        const bodySchema = op.body?.schema ?? {};

        for (const name of bodyRequired) {
            const schema = bodySchema[name] ?? {};
            let type = 'string';
            if (schema.type === 'number' || schema.type === 'integer') type = 'number';
            if (schema.type === 'boolean') type = 'boolean';

            const defVal =
                type === 'string' ? "''" : type === 'number' ? '0' : type === 'boolean' ? 'false' : "''";

            dynamicProps.push(`
      {
        displayName: 'Body ${name}',
        name: 'body_${name}',
        type: '${type}',
        default: ${defVal},
        placeholder: '${name}',
        description: '${schema?.description ?? name}',
        displayOptions: { show: { operation: ['${value}'] } }
      }`);
        }
    }

    return `[
    ${dropdown},
    ${dynamicProps.join(',\n    ')}
  ]`;
}

// build execute switch
function buildExecuteSwitch(ops: Array<any>) {
    const cases: string[] = [];

    for (const op of ops) {
        const val = operationValue(op.tag, op.operationId);
        const method = (op.method || 'get').toLowerCase();
        const url = op.path;
        const q = op.query ?? [];
        const bodyReq = op.body?.required ?? [];

        const qLines =
            q
                .map(
                    (name: string) =>
                        `const query_${_.snakeCase(name)} = this.getNodeParameter('query_${_.snakeCase(name)}', i, '') as string;`,
                )
                .join('\n          ') || '';

        const bodyLines =
            bodyReq
                .map(
                    (name: string) =>
                        `const body_${_.snakeCase(name)} = this.getNodeParameter('body_${_.snakeCase(name)}', i, '') as any;`,
                )
                .join('\n          ') || '';

        const bodyObject =
            bodyReq.length > 0
                ? `const body = { ${bodyReq.map((n: string) => `${_.snakeCase(n)}: body_${_.snakeCase(n)}`).join(', ')} };`
                : 'const body = undefined;';

        const paramsObj =
            q.length > 0 ? `params: { ${q.map((n: string) => `${_.snakeCase(n)}: query_${_.snakeCase(n)}`).join(', ')} },` : '';

        const dataLine = method === 'get' ? '' : 'data: body,';

        cases.push(`
      case '${val}': {
          ${qLines}
          ${bodyLines}
          ${bodyObject}
          url = baseUrl + '${url}';
          method = '${method}';
          axiosConfig = {
            headers: finalHeaders,
            ${paramsObj}
            ${dataLine}
          };
          break;
      }
    `);
    }

    return `
    switch (operation) {
      ${cases.join('\n')}
      default:
        throw new Error('Unknown operation: ' + operation);
    }
  `;
}

// top-level
function generateNodeFile(ops: Array<any>) {
    const propertiesBlock = buildPropertiesBlock(ops);
    const executeSwitch = buildExecuteSwitch(ops);

    return `import type { INodeType, INodeTypeDescription, IExecuteFunctions } from 'n8n-workflow';
import axios from 'axios';

export class ${namespaceCase} implements INodeType {
  description: INodeTypeDescription = {
    displayName: '${namespaceCase}',
    name: '${namespaceCase}',
    icon: 'file:icon.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Universal node generated from OpenAPI - satu node memuat semua endpoint',
    defaults: { name: '${namespaceCase}' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      { name: '${CREDENTIAL_NAME}', required: true }
    ],
    properties: ${propertiesBlock}
  };

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData: any[] = [];
    const creds = await this.getCredentials('${CREDENTIAL_NAME}') as any;

    const baseUrlRaw = creds?.baseUrl ?? '';
    const apiKeyRaw = creds?.token ?? '';
    const baseUrl = String(baseUrlRaw || '').replace(/\\/$/, '');
    const apiKey = String(apiKeyRaw || '').trim().replace(/^Bearer\\s+/i, '');

    if (!baseUrl) throw new Error('Base URL tidak ditemukan');
    if (!apiKey) throw new Error('Token tidak ditemukan');

    for (let i = 0; i < items.length; i++) {
      const operation = this.getNodeParameter('operation', i) as string;

      let url = '';
      let method: any = 'get';
      let axiosConfig: any = {};
      const finalHeaders: any = { Authorization: \`Bearer \${apiKey}\` };

      ${executeSwitch}

      try {
        const response = await axios({ method, url, ...axiosConfig });
        returnData.push(response.data);
      } catch (err: any) {
        returnData.push({
          error: true,
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
      }
    }

    return [this.helpers.returnJsonArray(returnData)];
  }
}

`;
}

// main
async function run() {
    console.log('💡 Loading OpenAPI...');
    const api = await loadOpenAPI();

    const ops: Array<any> = [];

    for (const pathStr of Object.keys(api.paths || {})) {
        const pathObj = api.paths[pathStr];

        for (const method of Object.keys(pathObj)) {
            const operation = pathObj[method];
            const tags = operation.tags?.length ? operation.tags : ['default'];

            console.log("✅", _.upperCase(method).padEnd(7), pathStr);

            const operationId = operation.operationId || `${method}_${safe(pathStr)}`;
            const query = (operation.parameters ?? [])
                .filter((p: any) => p.in === 'query')
                .map((p: any) => p.name);

            const requestBody =
                operation.requestBody?.content?.['application/json']?.schema ??
                operation.requestBody?.content?.['multipart/form-data']?.schema ??
                null;

            const bodyRequired = requestBody?.required ?? [];
            const bodyProps = requestBody?.properties ?? {};

            for (const tag of tags) {
                ops.push({
                    tag,
                    path: pathStr,
                    method,
                    operationId,
                    summary: operation.summary || '',
                    description: operation.description || '',
                    query,
                    body: {
                        required: bodyRequired,
                        schema: bodyProps,
                    },
                });
            }
        }
    }

    if (ops.length === 0) throw new Error('No operations found');

    console.log('💡 Creating output directory...');
    await fs.mkdir(OUT_DIR, { recursive: true }).catch(() => {});
    console.log('💡 Creating credentials directory...');
    await fs.mkdir(`src/credentials`, { recursive: true }).catch(() => {});

    const raw = generateNodeFile(ops);

    // ✅ PRETTIER SAFE-FORMAT
    let formatted: string;
    try {
        console.log('💡 Formatting with Prettier...');
        const conf = await prettier.resolveConfig(process.cwd()).catch(() => null);

        formatted = await prettier.format(raw, {
            ...(conf || {}),
            parser: 'typescript',
        });
    } catch (err) {
        console.warn('⚠️ Prettier gagal → output raw digunakan.');
        formatted = raw;
    }

    console.log('✅ Generated single node file:', OUT_FILE);
    await fs.writeFile(OUT_FILE, formatted, 'utf-8');

    // credential 
    console.log('💡 Copying credentials...');
    await fs.copyFile("assets/WibuApi.credentials.txt", `src/credentials/WibuApi.credentials.ts`)

    console.log('💡 Compiling TypeScript...');
    execSync('rm -rf dist && npx tsc')

    const packageText = await fs.readFile("assets/package.txt", 'utf-8')
    const packageJson = JSON.parse(packageText)

    const version = packageJson.version.split(".")
    version[2] = (Number(version[2]) + 1).toString()
    packageJson.version = version.join(".")
    console.log("💡 version", packageJson.version)

    packageJson.name = `n8n-nodes-${_.kebabCase(namespaceCase)}`
    packageJson.n8n.nodes = [`nodes/${namespaceCase}.node.js`]
    packageJson.n8n.credentials = [`credentials/WibuApi.credentials.js`]

    console.log('💡 Updating package.json...')
    await fs.writeFile("dist/package.json", JSON.stringify(packageJson, null, 2))
    await fs.writeFile("assets/package.txt", JSON.stringify(packageJson, null, 2))
    await fs.copyFile("assets/icon.svg", "dist/nodes/icon.svg")

    console.log('💡 Renaming dist to package name...')
    await fs.rmdir(packageJson.name, { recursive: true }).catch(() => {})
    await fs.rename("dist", packageJson.name).catch((e) => {throw new Error("gagal rename dist")})

    console.log('💡 Publishing...')
    execSync(`cd ${packageJson.name} && bun publish`)
    
    console.log('✅ Generated single node file:', OUT_FILE);
}

run().catch((err) => {
    console.error('❌ Generator failed:', err);
    process.exit(1);
});
