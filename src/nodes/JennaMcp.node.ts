import type {
  INodeType,
  INodeTypeDescription,
  IExecuteFunctions,
} from "n8n-workflow";
import axios from "axios";

export class JennaMcp implements INodeType {
  description: INodeTypeDescription = {
    displayName: "JennaMcp",
    name: "JennaMcp",
    icon: "file:icon.svg",
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description:
      "Universal node generated from OpenAPI - satu node memuat semua endpoint",
    defaults: { name: "JennaMcp" },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [{ name: "wibuApi", required: true }],
    properties: [
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        options: [
          {
            name: "jenna-mcp mcp getApiPengaduanCategory",
            value: "mcp_getApiPengaduanCategory",
            description: "List Kategori Pengaduan",
            action: "jenna-mcp mcp getApiPengaduanCategory",
          },
          {
            name: "jenna-mcp pengaduan postApiPengaduanCategoryCreate",
            value: "pengaduan_postApiPengaduanCategoryCreate",
            description: "buat kategori pengaduan",
            action: "jenna-mcp pengaduan postApiPengaduanCategoryCreate",
          },
          {
            name: "jenna-mcp pengaduan postApiPengaduanCategoryUpdate",
            value: "pengaduan_postApiPengaduanCategoryUpdate",
            description: "update kategori pengaduan",
            action: "jenna-mcp pengaduan postApiPengaduanCategoryUpdate",
          },
          {
            name: "jenna-mcp pengaduan postApiPengaduanCategoryDelete",
            value: "pengaduan_postApiPengaduanCategoryDelete",
            description: "delete kategori pengaduan",
            action: "jenna-mcp pengaduan postApiPengaduanCategoryDelete",
          },
          {
            name: "jenna-mcp mcp postApiPengaduanCreate",
            value: "mcp_postApiPengaduanCreate",
            description: "Create Pengaduan Warga",
            action: "jenna-mcp mcp postApiPengaduanCreate",
          },
          {
            name: "jenna-mcp pengaduan postApiPengaduanUpdate-status",
            value: "pengaduan_postApiPengaduanUpdate_status",
            description: "Update status pengaduan",
            action: "jenna-mcp pengaduan postApiPengaduanUpdate-status",
          },
          {
            name: "jenna-mcp mcp getApiPengaduanDetail",
            value: "mcp_getApiPengaduanDetail",
            description: "Detail Pengaduan Warga",
            action: "jenna-mcp mcp getApiPengaduanDetail",
          },
          {
            name: "jenna-mcp mcp getApiPengaduan",
            value: "mcp_getApiPengaduan",
            description: "List Pengaduan Warga By Phone",
            action: "jenna-mcp mcp getApiPengaduan",
          },
          {
            name: "jenna-mcp mcp postApiPengaduanUpload",
            value: "mcp_postApiPengaduanUpload",
            description: "Upload File",
            action: "jenna-mcp mcp postApiPengaduanUpload",
          },
          {
            name: "jenna-mcp mcp postApiPengaduanUpload-base64",
            value: "mcp_postApiPengaduanUpload_base64",
            description: "Upload File (Base64)",
            action: "jenna-mcp mcp postApiPengaduanUpload-base64",
          },
          {
            name: "jenna-mcp pengaduan getApiPengaduanList",
            value: "pengaduan_getApiPengaduanList",
            description: "List Pengaduan Warga",
            action: "jenna-mcp pengaduan getApiPengaduanList",
          },
          {
            name: "jenna-mcp pengaduan getApiPengaduanCount",
            value: "pengaduan_getApiPengaduanCount",
            description: "Jumlah Pengaduan Warga",
            action: "jenna-mcp pengaduan getApiPengaduanCount",
          },
          {
            name: "jenna-mcp mcp getApiPelayananCategory",
            value: "mcp_getApiPelayananCategory",
            description: "List Kategori Pelayanan Surat",
            action: "jenna-mcp mcp getApiPelayananCategory",
          },
          {
            name: "jenna-mcp pelayanan postApiPelayananCategoryCreate",
            value: "pelayanan_postApiPelayananCategoryCreate",
            description: "buat kategori pelayanan surat",
            action: "jenna-mcp pelayanan postApiPelayananCategoryCreate",
          },
          {
            name: "jenna-mcp pelayanan postApiPelayananCategoryUpdate",
            value: "pelayanan_postApiPelayananCategoryUpdate",
            description: "update kategori pelayanan surat",
            action: "jenna-mcp pelayanan postApiPelayananCategoryUpdate",
          },
          {
            name: "jenna-mcp pelayanan postApiPelayananCategoryDelete",
            value: "pelayanan_postApiPelayananCategoryDelete",
            description: "delete kategori pelayanan surat",
            action: "jenna-mcp pelayanan postApiPelayananCategoryDelete",
          },
          {
            name: "jenna-mcp mcp getApiPelayanan",
            value: "mcp_getApiPelayanan",
            description: "List Ajuan Pelayanan Surat",
            action: "jenna-mcp mcp getApiPelayanan",
          },
          {
            name: "jenna-mcp mcp getApiPelayananDetail",
            value: "mcp_getApiPelayananDetail",
            description: "Detail Ajuan Pelayanan Surat",
            action: "jenna-mcp mcp getApiPelayananDetail",
          },
          {
            name: "jenna-mcp mcp postApiPelayananCreate",
            value: "mcp_postApiPelayananCreate",
            description: "Create Pengajuan Pelayanan Surat",
            action: "jenna-mcp mcp postApiPelayananCreate",
          },
          {
            name: "jenna-mcp mcp postApiPelayananUpdate-status",
            value: "mcp_postApiPelayananUpdate_status",
            description: "Update Status Pengajuan Pelayanan Surat",
            action: "jenna-mcp mcp postApiPelayananUpdate-status",
          },
          {
            name: "jenna-mcp apikey postApiApikeyCreate",
            value: "apikey_postApiApikeyCreate",
            description: "create",
            action: "jenna-mcp apikey postApiApikeyCreate",
          },
          {
            name: "jenna-mcp apikey getApiApikeyList",
            value: "apikey_getApiApikeyList",
            description: "list",
            action: "jenna-mcp apikey getApiApikeyList",
          },
          {
            name: "jenna-mcp apikey deleteApiApikeyDelete",
            value: "apikey_deleteApiApikeyDelete",
            description: "delete",
            action: "jenna-mcp apikey deleteApiApikeyDelete",
          },
          {
            name: "jenna-mcp darmasaba getApiDarmasabaRepos",
            value: "darmasaba_getApiDarmasabaRepos",
            description: "repos",
            action: "jenna-mcp darmasaba getApiDarmasabaRepos",
          },
          {
            name: "jenna-mcp darmasaba getApiDarmasabaLs",
            value: "darmasaba_getApiDarmasabaLs",
            description: "ls",
            action: "jenna-mcp darmasaba getApiDarmasabaLs",
          },
          {
            name: "jenna-mcp darmasaba getApiDarmasabaLsByDir",
            value: "darmasaba_getApiDarmasabaLsByDir",
            description: "ls",
            action: "jenna-mcp darmasaba getApiDarmasabaLsByDir",
          },
          {
            name: "jenna-mcp darmasaba getApiDarmasabaFileByDirByFile_name",
            value: "darmasaba_getApiDarmasabaFileByDirByFile_name",
            description: "file",
            action: "jenna-mcp darmasaba getApiDarmasabaFileByDirByFile_name",
          },
          {
            name: "jenna-mcp darmasaba getApiDarmasabaList-pengetahuan-umum",
            value: "darmasaba_getApiDarmasabaList_pengetahuan_umum",
            description: "list-pengetahuan-umum",
            action: "jenna-mcp darmasaba getApiDarmasabaList-pengetahuan-umum",
          },
          {
            name: "jenna-mcp darmasaba getApiDarmasabaPengetahuan-umumByFile_name",
            value: "darmasaba_getApiDarmasabaPengetahuan_umumByFile_name",
            description: "pengetahuan-umum",
            action:
              "jenna-mcp darmasaba getApiDarmasabaPengetahuan-umumByFile_name",
          },
          {
            name: "jenna-mcp darmasaba postApiDarmasabaBuat-pengaduan",
            value: "darmasaba_postApiDarmasabaBuat_pengaduan",
            description: "buat-pengaduan atau pelaporan",
            action: "jenna-mcp darmasaba postApiDarmasabaBuat-pengaduan",
          },
          {
            name: "jenna-mcp darmasaba postApiDarmasabaStatus-pengaduan",
            value: "darmasaba_postApiDarmasabaStatus_pengaduan",
            description: "lihat status pengaduan",
            action: "jenna-mcp darmasaba postApiDarmasabaStatus-pengaduan",
          },
          {
            name: "jenna-mcp credential postApiCredentialCreate",
            value: "credential_postApiCredentialCreate",
            description: "create",
            action: "jenna-mcp credential postApiCredentialCreate",
          },
          {
            name: "jenna-mcp credential getApiCredentialList",
            value: "credential_getApiCredentialList",
            description: "list",
            action: "jenna-mcp credential getApiCredentialList",
          },
          {
            name: "jenna-mcp credential deleteApiCredentialRm",
            value: "credential_deleteApiCredentialRm",
            description: "rm",
            action: "jenna-mcp credential deleteApiCredentialRm",
          },
          {
            name: "jenna-mcp user getApiUserFind",
            value: "user_getApiUserFind",
            description: "find",
            action: "jenna-mcp user getApiUserFind",
          },
          {
            name: "jenna-mcp user postApiUserUpsert",
            value: "user_postApiUserUpsert",
            description: "upsert",
            action: "jenna-mcp user postApiUserUpsert",
          },
          {
            name: "jenna-mcp layanan getApiLayananList",
            value: "layanan_getApiLayananList",
            description: "List Layanan",
            action: "jenna-mcp layanan getApiLayananList",
          },
          {
            name: "jenna-mcp layanan postApiLayananCreate-ktp",
            value: "layanan_postApiLayananCreate_ktp",
            description: "Create Layanan KTP/KK",
            action: "jenna-mcp layanan postApiLayananCreate-ktp",
          },
          {
            name: "jenna-mcp layanan postApiLayananStatus-ktp",
            value: "layanan_postApiLayananStatus_ktp",
            description: "Cek Status KTP",
            action: "jenna-mcp layanan postApiLayananStatus-ktp",
          },
          {
            name: "jenna-mcp aduan postApiAduanCreate",
            value: "aduan_postApiAduanCreate",
            description: "create",
            action: "jenna-mcp aduan postApiAduanCreate",
          },
          {
            name: "jenna-mcp aduan postApiAduanAduan-sampah",
            value: "aduan_postApiAduanAduan_sampah",
            description: "aduan sampah",
            action: "jenna-mcp aduan postApiAduanAduan-sampah",
          },
          {
            name: "jenna-mcp aduan getApiAduanList-aduan-sampah",
            value: "aduan_getApiAduanList_aduan_sampah",
            description: "list aduan sampah",
            action: "jenna-mcp aduan getApiAduanList-aduan-sampah",
          },
          {
            name: "jenna-mcp auth postAuthLogin",
            value: "auth_postAuthLogin",
            description: "login",
            action: "jenna-mcp auth postAuthLogin",
          },
          {
            name: "jenna-mcp auth deleteAuthLogout",
            value: "auth_deleteAuthLogout",
            description: "logout",
            action: "jenna-mcp auth deleteAuthLogout",
          },
          {
            name: "jenna-mcp MCP Server postMcp",
            value: "MCP_Server_postMcp",
            description: "",
            action: "jenna-mcp MCP Server postMcp",
          },
          {
            name: "jenna-mcp MCP Server getMcpTools",
            value: "MCP_Server_getMcpTools",
            description: "",
            action: "jenna-mcp MCP Server getMcpTools",
          },
          {
            name: "jenna-mcp MCP Server getMcpStatus",
            value: "MCP_Server_getMcpStatus",
            description: "",
            action: "jenna-mcp MCP Server getMcpStatus",
          },
          {
            name: "jenna-mcp MCP Server getHealth",
            value: "MCP_Server_getHealth",
            description: "",
            action: "jenna-mcp MCP Server getHealth",
          },
          {
            name: "jenna-mcp MCP Server getMcpInit",
            value: "MCP_Server_getMcpInit",
            description: "",
            action: "jenna-mcp MCP Server getMcpInit",
          },
        ],
        default: "mcp_getApiPengaduanCategory",
        description: "Pilih endpoint yang akan dipanggil",
      },

      {
        displayName: "Body name",
        name: "body_name",
        type: "string",
        default: "",
        placeholder: "name",
        description: "name",
        displayOptions: {
          show: { operation: ["pengaduan_postApiPengaduanCategoryCreate"] },
        },
      },

      {
        displayName: "Body id",
        name: "body_id",
        type: "string",
        default: "",
        placeholder: "id",
        description: "id",
        displayOptions: {
          show: { operation: ["pengaduan_postApiPengaduanCategoryUpdate"] },
        },
      },

      {
        displayName: "Body name",
        name: "body_name",
        type: "string",
        default: "",
        placeholder: "name",
        description: "name",
        displayOptions: {
          show: { operation: ["pengaduan_postApiPengaduanCategoryUpdate"] },
        },
      },

      {
        displayName: "Body id",
        name: "body_id",
        type: "string",
        default: "",
        placeholder: "id",
        description: "id",
        displayOptions: {
          show: { operation: ["pengaduan_postApiPengaduanCategoryDelete"] },
        },
      },

      {
        displayName: "Body title",
        name: "body_title",
        type: "string",
        default: "",
        placeholder: "title",
        description: "title",
        displayOptions: { show: { operation: ["mcp_postApiPengaduanCreate"] } },
      },

      {
        displayName: "Body detail",
        name: "body_detail",
        type: "string",
        default: "",
        placeholder: "detail",
        description: "detail",
        displayOptions: { show: { operation: ["mcp_postApiPengaduanCreate"] } },
      },

      {
        displayName: "Body location",
        name: "body_location",
        type: "string",
        default: "",
        placeholder: "location",
        description: "location",
        displayOptions: { show: { operation: ["mcp_postApiPengaduanCreate"] } },
      },

      {
        displayName: "Body image",
        name: "body_image",
        type: "string",
        default: "",
        placeholder: "image",
        description: "image",
        displayOptions: { show: { operation: ["mcp_postApiPengaduanCreate"] } },
      },

      {
        displayName: "Body idCategory",
        name: "body_idCategory",
        type: "string",
        default: "",
        placeholder: "idCategory",
        description: "idCategory",
        displayOptions: { show: { operation: ["mcp_postApiPengaduanCreate"] } },
      },

      {
        displayName: "Body idWarga",
        name: "body_idWarga",
        type: "string",
        default: "",
        placeholder: "idWarga",
        description: "idWarga",
        displayOptions: { show: { operation: ["mcp_postApiPengaduanCreate"] } },
      },

      {
        displayName: "Body phone",
        name: "body_phone",
        type: "string",
        default: "",
        placeholder: "phone",
        description: "phone",
        displayOptions: { show: { operation: ["mcp_postApiPengaduanCreate"] } },
      },

      {
        displayName: "Body id",
        name: "body_id",
        type: "string",
        default: "",
        placeholder: "id",
        description: "id",
        displayOptions: {
          show: { operation: ["pengaduan_postApiPengaduanUpdate_status"] },
        },
      },

      {
        displayName: "Body status",
        name: "body_status",
        type: "string",
        default: "",
        placeholder: "status",
        description: "status",
        displayOptions: {
          show: { operation: ["pengaduan_postApiPengaduanUpdate_status"] },
        },
      },

      {
        displayName: "Body keterangan",
        name: "body_keterangan",
        type: "string",
        default: "",
        placeholder: "keterangan",
        description: "keterangan",
        displayOptions: {
          show: { operation: ["pengaduan_postApiPengaduanUpdate_status"] },
        },
      },

      {
        displayName: "Body idUser",
        name: "body_idUser",
        type: "string",
        default: "",
        placeholder: "idUser",
        description: "idUser",
        displayOptions: {
          show: { operation: ["pengaduan_postApiPengaduanUpdate_status"] },
        },
      },

      {
        displayName: "Query take",
        name: "query_take",
        type: "string",
        default: "",
        placeholder: "take",
        description: "take",
        displayOptions: { show: { operation: ["mcp_getApiPengaduan"] } },
      },

      {
        displayName: "Query page",
        name: "query_page",
        type: "string",
        default: "",
        placeholder: "page",
        description: "page",
        displayOptions: { show: { operation: ["mcp_getApiPengaduan"] } },
      },

      {
        displayName: "Query search",
        name: "query_search",
        type: "string",
        default: "",
        placeholder: "search",
        description: "search",
        displayOptions: { show: { operation: ["mcp_getApiPengaduan"] } },
      },

      {
        displayName: "Query phone",
        name: "query_phone",
        type: "string",
        default: "",
        placeholder: "phone",
        description: "phone",
        displayOptions: { show: { operation: ["mcp_getApiPengaduan"] } },
      },

      {
        displayName: "Body file",
        name: "body_file",
        type: "string",
        default: "",
        placeholder: "file",
        description: "file",
        displayOptions: { show: { operation: ["mcp_postApiPengaduanUpload"] } },
      },

      {
        displayName: "Body data",
        name: "body_data",
        type: "string",
        default: "",
        placeholder: "data",
        description: "data",
        displayOptions: {
          show: { operation: ["mcp_postApiPengaduanUpload_base64"] },
        },
      },

      {
        displayName: "Body mimetype",
        name: "body_mimetype",
        type: "string",
        default: "",
        placeholder: "mimetype",
        description: "mimetype",
        displayOptions: {
          show: { operation: ["mcp_postApiPengaduanUpload_base64"] },
        },
      },

      {
        displayName: "Query take",
        name: "query_take",
        type: "string",
        default: "",
        placeholder: "take",
        description: "take",
        displayOptions: {
          show: { operation: ["pengaduan_getApiPengaduanList"] },
        },
      },

      {
        displayName: "Query page",
        name: "query_page",
        type: "string",
        default: "",
        placeholder: "page",
        description: "page",
        displayOptions: {
          show: { operation: ["pengaduan_getApiPengaduanList"] },
        },
      },

      {
        displayName: "Query search",
        name: "query_search",
        type: "string",
        default: "",
        placeholder: "search",
        description: "search",
        displayOptions: {
          show: { operation: ["pengaduan_getApiPengaduanList"] },
        },
      },

      {
        displayName: "Query status",
        name: "query_status",
        type: "string",
        default: "",
        placeholder: "status",
        description: "status",
        displayOptions: {
          show: { operation: ["pengaduan_getApiPengaduanList"] },
        },
      },

      {
        displayName: "Body name",
        name: "body_name",
        type: "string",
        default: "",
        placeholder: "name",
        description: "name",
        displayOptions: {
          show: { operation: ["pelayanan_postApiPelayananCategoryCreate"] },
        },
      },

      {
        displayName: "Body syaratDokumen",
        name: "body_syaratDokumen",
        type: "string",
        default: "",
        placeholder: "syaratDokumen",
        description: "syaratDokumen",
        displayOptions: {
          show: { operation: ["pelayanan_postApiPelayananCategoryCreate"] },
        },
      },

      {
        displayName: "Body dataText",
        name: "body_dataText",
        type: "string",
        default: "",
        placeholder: "dataText",
        description: "dataText",
        displayOptions: {
          show: { operation: ["pelayanan_postApiPelayananCategoryCreate"] },
        },
      },

      {
        displayName: "Body id",
        name: "body_id",
        type: "string",
        default: "",
        placeholder: "id",
        description: "id",
        displayOptions: {
          show: { operation: ["pelayanan_postApiPelayananCategoryUpdate"] },
        },
      },

      {
        displayName: "Body name",
        name: "body_name",
        type: "string",
        default: "",
        placeholder: "name",
        description: "name",
        displayOptions: {
          show: { operation: ["pelayanan_postApiPelayananCategoryUpdate"] },
        },
      },

      {
        displayName: "Body syaratDokumen",
        name: "body_syaratDokumen",
        type: "string",
        default: "",
        placeholder: "syaratDokumen",
        description: "syaratDokumen",
        displayOptions: {
          show: { operation: ["pelayanan_postApiPelayananCategoryUpdate"] },
        },
      },

      {
        displayName: "Body dataText",
        name: "body_dataText",
        type: "string",
        default: "",
        placeholder: "dataText",
        description: "dataText",
        displayOptions: {
          show: { operation: ["pelayanan_postApiPelayananCategoryUpdate"] },
        },
      },

      {
        displayName: "Body id",
        name: "body_id",
        type: "string",
        default: "",
        placeholder: "id",
        description: "id",
        displayOptions: {
          show: { operation: ["pelayanan_postApiPelayananCategoryDelete"] },
        },
      },

      {
        displayName: "Query id",
        name: "query_id",
        type: "string",
        default: "",
        placeholder: "id",
        description: "id",
        displayOptions: { show: { operation: ["mcp_getApiPelayananDetail"] } },
      },

      {
        displayName: "Body idCategory",
        name: "body_idCategory",
        type: "string",
        default: "",
        placeholder: "idCategory",
        description: "idCategory",
        displayOptions: { show: { operation: ["mcp_postApiPelayananCreate"] } },
      },

      {
        displayName: "Body idWarga",
        name: "body_idWarga",
        type: "string",
        default: "",
        placeholder: "idWarga",
        description: "idWarga",
        displayOptions: { show: { operation: ["mcp_postApiPelayananCreate"] } },
      },

      {
        displayName: "Body phone",
        name: "body_phone",
        type: "string",
        default: "",
        placeholder: "phone",
        description: "phone",
        displayOptions: { show: { operation: ["mcp_postApiPelayananCreate"] } },
      },

      {
        displayName: "Body dataText",
        name: "body_dataText",
        type: "string",
        default: "",
        placeholder: "dataText",
        description: "dataText",
        displayOptions: { show: { operation: ["mcp_postApiPelayananCreate"] } },
      },

      {
        displayName: "Body syaratDokumen",
        name: "body_syaratDokumen",
        type: "string",
        default: "",
        placeholder: "syaratDokumen",
        description: "syaratDokumen",
        displayOptions: { show: { operation: ["mcp_postApiPelayananCreate"] } },
      },

      {
        displayName: "Body id",
        name: "body_id",
        type: "string",
        default: "",
        placeholder: "id",
        description: "id",
        displayOptions: {
          show: { operation: ["mcp_postApiPelayananUpdate_status"] },
        },
      },

      {
        displayName: "Body status",
        name: "body_status",
        type: "string",
        default: "",
        placeholder: "status",
        description: "status",
        displayOptions: {
          show: { operation: ["mcp_postApiPelayananUpdate_status"] },
        },
      },

      {
        displayName: "Body keterangan",
        name: "body_keterangan",
        type: "string",
        default: "",
        placeholder: "keterangan",
        description: "keterangan",
        displayOptions: {
          show: { operation: ["mcp_postApiPelayananUpdate_status"] },
        },
      },

      {
        displayName: "Body idUser",
        name: "body_idUser",
        type: "string",
        default: "",
        placeholder: "idUser",
        description: "idUser",
        displayOptions: {
          show: { operation: ["mcp_postApiPelayananUpdate_status"] },
        },
      },

      {
        displayName: "Body name",
        name: "body_name",
        type: "string",
        default: "",
        placeholder: "name",
        description: "name",
        displayOptions: { show: { operation: ["apikey_postApiApikeyCreate"] } },
      },

      {
        displayName: "Body description",
        name: "body_description",
        type: "string",
        default: "",
        placeholder: "description",
        description: "description",
        displayOptions: { show: { operation: ["apikey_postApiApikeyCreate"] } },
      },

      {
        displayName: "Body id",
        name: "body_id",
        type: "string",
        default: "",
        placeholder: "id",
        description: "id",
        displayOptions: {
          show: { operation: ["apikey_deleteApiApikeyDelete"] },
        },
      },

      {
        displayName: "Body jenis_laporan",
        name: "body_jenis_laporan",
        type: "string",
        default: "",
        placeholder: "jenis_laporan",
        description: "jenis_laporan",
        displayOptions: {
          show: { operation: ["darmasaba_postApiDarmasabaBuat_pengaduan"] },
        },
      },

      {
        displayName: "Body name",
        name: "body_name",
        type: "string",
        default: "",
        placeholder: "name",
        description: "name",
        displayOptions: {
          show: { operation: ["darmasaba_postApiDarmasabaBuat_pengaduan"] },
        },
      },

      {
        displayName: "Body phone",
        name: "body_phone",
        type: "string",
        default: "",
        placeholder: "phone",
        description: "phone",
        displayOptions: {
          show: { operation: ["darmasaba_postApiDarmasabaBuat_pengaduan"] },
        },
      },

      {
        displayName: "Body detail",
        name: "body_detail",
        type: "string",
        default: "",
        placeholder: "detail",
        description: "detail",
        displayOptions: {
          show: { operation: ["darmasaba_postApiDarmasabaBuat_pengaduan"] },
        },
      },

      {
        displayName: "Body name",
        name: "body_name",
        type: "string",
        default: "",
        placeholder: "name",
        description: "name",
        displayOptions: {
          show: { operation: ["darmasaba_postApiDarmasabaStatus_pengaduan"] },
        },
      },

      {
        displayName: "Body phone",
        name: "body_phone",
        type: "string",
        default: "",
        placeholder: "phone",
        description: "phone",
        displayOptions: {
          show: { operation: ["darmasaba_postApiDarmasabaStatus_pengaduan"] },
        },
      },

      {
        displayName: "Body name",
        name: "body_name",
        type: "string",
        default: "",
        placeholder: "name",
        description: "name",
        displayOptions: {
          show: { operation: ["credential_postApiCredentialCreate"] },
        },
      },

      {
        displayName: "Body value",
        name: "body_value",
        type: "string",
        default: "",
        placeholder: "value",
        description: "value",
        displayOptions: {
          show: { operation: ["credential_postApiCredentialCreate"] },
        },
      },

      {
        displayName: "Body id",
        name: "body_id",
        type: "string",
        default: "",
        placeholder: "id",
        description: "id",
        displayOptions: {
          show: { operation: ["credential_deleteApiCredentialRm"] },
        },
      },

      {
        displayName: "Body name",
        name: "body_name",
        type: "string",
        default: "",
        placeholder: "name",
        description: "name",
        displayOptions: { show: { operation: ["user_postApiUserUpsert"] } },
      },

      {
        displayName: "Body phone",
        name: "body_phone",
        type: "string",
        default: "",
        placeholder: "phone",
        description: "phone",
        displayOptions: { show: { operation: ["user_postApiUserUpsert"] } },
      },

      {
        displayName: "Body jenis",
        name: "body_jenis",
        type: "string",
        default: "",
        placeholder: "jenis",
        description: "jenis",
        displayOptions: {
          show: { operation: ["layanan_postApiLayananCreate_ktp"] },
        },
      },

      {
        displayName: "Body nama",
        name: "body_nama",
        type: "string",
        default: "",
        placeholder: "nama",
        description: "Nama pemohon layanan",
        displayOptions: {
          show: { operation: ["layanan_postApiLayananCreate_ktp"] },
        },
      },

      {
        displayName: "Body deskripsi",
        name: "body_deskripsi",
        type: "string",
        default: "",
        placeholder: "deskripsi",
        description: "Deskripsi singkat permohonan layanan",
        displayOptions: {
          show: { operation: ["layanan_postApiLayananCreate_ktp"] },
        },
      },

      {
        displayName: "Body uniqid",
        name: "body_uniqid",
        type: "string",
        default: "",
        placeholder: "uniqid",
        description: "Unique ID layanan",
        displayOptions: {
          show: { operation: ["layanan_postApiLayananStatus_ktp"] },
        },
      },

      {
        displayName: "Body title",
        name: "body_title",
        type: "string",
        default: "",
        placeholder: "title",
        description: "title",
        displayOptions: { show: { operation: ["aduan_postApiAduanCreate"] } },
      },

      {
        displayName: "Body description",
        name: "body_description",
        type: "string",
        default: "",
        placeholder: "description",
        description: "description",
        displayOptions: { show: { operation: ["aduan_postApiAduanCreate"] } },
      },

      {
        displayName: "Body judul",
        name: "body_judul",
        type: "string",
        default: "",
        placeholder: "judul",
        description: "judul",
        displayOptions: {
          show: { operation: ["aduan_postApiAduanAduan_sampah"] },
        },
      },

      {
        displayName: "Body deskripsi",
        name: "body_deskripsi",
        type: "string",
        default: "",
        placeholder: "deskripsi",
        description: "deskripsi",
        displayOptions: {
          show: { operation: ["aduan_postApiAduanAduan_sampah"] },
        },
      },

      {
        displayName: "Body email",
        name: "body_email",
        type: "string",
        default: "",
        placeholder: "email",
        description: "email",
        displayOptions: { show: { operation: ["auth_postAuthLogin"] } },
      },

      {
        displayName: "Body password",
        name: "body_password",
        type: "string",
        default: "",
        placeholder: "password",
        description: "password",
        displayOptions: { show: { operation: ["auth_postAuthLogin"] } },
      },
    ],
  };

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData: any[] = [];
    const creds = (await this.getCredentials("wibuApi")) as any;

    const baseUrlRaw = creds?.baseUrl ?? "";
    const apiKeyRaw = creds?.token ?? "";
    const baseUrl = String(baseUrlRaw || "").replace(/\/$/, "");
    const apiKey = String(apiKeyRaw || "")
      .trim()
      .replace(/^Bearer\s+/i, "");

    if (!baseUrl) throw new Error("Base URL tidak ditemukan");
    if (!apiKey) throw new Error("Token tidak ditemukan");

    for (let i = 0; i < items.length; i++) {
      const operation = this.getNodeParameter("operation", i) as string;

      let url = "";
      let method: any = "get";
      let axiosConfig: any = {};
      const finalHeaders: any = { Authorization: `Bearer ${apiKey}` };

      switch (operation) {
        case "mcp_getApiPengaduanCategory": {
          const body = undefined;
          url = baseUrl + "/api/pengaduan/category";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "pengaduan_postApiPengaduanCategoryCreate": {
          const body_name = this.getNodeParameter("body_name", i, "") as any;
          const body = { name: body_name };
          url = baseUrl + "/api/pengaduan/category/create";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "pengaduan_postApiPengaduanCategoryUpdate": {
          const body_id = this.getNodeParameter("body_id", i, "") as any;
          const body_name = this.getNodeParameter("body_name", i, "") as any;
          const body = { id: body_id, name: body_name };
          url = baseUrl + "/api/pengaduan/category/update";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "pengaduan_postApiPengaduanCategoryDelete": {
          const body_id = this.getNodeParameter("body_id", i, "") as any;
          const body = { id: body_id };
          url = baseUrl + "/api/pengaduan/category/delete";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "mcp_postApiPengaduanCreate": {
          const body_title = this.getNodeParameter("body_title", i, "") as any;
          const body_detail = this.getNodeParameter(
            "body_detail",
            i,
            "",
          ) as any;
          const body_location = this.getNodeParameter(
            "body_location",
            i,
            "",
          ) as any;
          const body_image = this.getNodeParameter("body_image", i, "") as any;
          const body_id_category = this.getNodeParameter(
            "body_id_category",
            i,
            "",
          ) as any;
          const body_id_warga = this.getNodeParameter(
            "body_id_warga",
            i,
            "",
          ) as any;
          const body_phone = this.getNodeParameter("body_phone", i, "") as any;
          const body = {
            title: body_title,
            detail: body_detail,
            location: body_location,
            image: body_image,
            id_category: body_id_category,
            id_warga: body_id_warga,
            phone: body_phone,
          };
          url = baseUrl + "/api/pengaduan/create";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "pengaduan_postApiPengaduanUpdate_status": {
          const body_id = this.getNodeParameter("body_id", i, "") as any;
          const body_status = this.getNodeParameter(
            "body_status",
            i,
            "",
          ) as any;
          const body_keterangan = this.getNodeParameter(
            "body_keterangan",
            i,
            "",
          ) as any;
          const body_id_user = this.getNodeParameter(
            "body_id_user",
            i,
            "",
          ) as any;
          const body = {
            id: body_id,
            status: body_status,
            keterangan: body_keterangan,
            id_user: body_id_user,
          };
          url = baseUrl + "/api/pengaduan/update-status";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "mcp_getApiPengaduanDetail": {
          const body = undefined;
          url = baseUrl + "/api/pengaduan/detail";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "mcp_getApiPengaduan": {
          const query_take = this.getNodeParameter(
            "query_take",
            i,
            "",
          ) as string;
          const query_page = this.getNodeParameter(
            "query_page",
            i,
            "",
          ) as string;
          const query_search = this.getNodeParameter(
            "query_search",
            i,
            "",
          ) as string;
          const query_phone = this.getNodeParameter(
            "query_phone",
            i,
            "",
          ) as string;

          const body = undefined;
          url = baseUrl + "/api/pengaduan/";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
            params: {
              take: query_take,
              page: query_page,
              search: query_search,
              phone: query_phone,
            },
          };
          break;
        }

        case "mcp_postApiPengaduanUpload": {
          const body_file = this.getNodeParameter("body_file", i, "") as any;
          const body = { file: body_file };
          url = baseUrl + "/api/pengaduan/upload";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "mcp_postApiPengaduanUpload_base64": {
          const body_data = this.getNodeParameter("body_data", i, "") as any;
          const body_mimetype = this.getNodeParameter(
            "body_mimetype",
            i,
            "",
          ) as any;
          const body = { data: body_data, mimetype: body_mimetype };
          url = baseUrl + "/api/pengaduan/upload-base64";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "pengaduan_getApiPengaduanList": {
          const query_take = this.getNodeParameter(
            "query_take",
            i,
            "",
          ) as string;
          const query_page = this.getNodeParameter(
            "query_page",
            i,
            "",
          ) as string;
          const query_search = this.getNodeParameter(
            "query_search",
            i,
            "",
          ) as string;
          const query_status = this.getNodeParameter(
            "query_status",
            i,
            "",
          ) as string;

          const body = undefined;
          url = baseUrl + "/api/pengaduan/list";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
            params: {
              take: query_take,
              page: query_page,
              search: query_search,
              status: query_status,
            },
          };
          break;
        }

        case "pengaduan_getApiPengaduanCount": {
          const body = undefined;
          url = baseUrl + "/api/pengaduan/count";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "mcp_getApiPelayananCategory": {
          const body = undefined;
          url = baseUrl + "/api/pelayanan/category";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "pelayanan_postApiPelayananCategoryCreate": {
          const body_name = this.getNodeParameter("body_name", i, "") as any;
          const body_syarat_dokumen = this.getNodeParameter(
            "body_syarat_dokumen",
            i,
            "",
          ) as any;
          const body_data_text = this.getNodeParameter(
            "body_data_text",
            i,
            "",
          ) as any;
          const body = {
            name: body_name,
            syarat_dokumen: body_syarat_dokumen,
            data_text: body_data_text,
          };
          url = baseUrl + "/api/pelayanan/category/create";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "pelayanan_postApiPelayananCategoryUpdate": {
          const body_id = this.getNodeParameter("body_id", i, "") as any;
          const body_name = this.getNodeParameter("body_name", i, "") as any;
          const body_syarat_dokumen = this.getNodeParameter(
            "body_syarat_dokumen",
            i,
            "",
          ) as any;
          const body_data_text = this.getNodeParameter(
            "body_data_text",
            i,
            "",
          ) as any;
          const body = {
            id: body_id,
            name: body_name,
            syarat_dokumen: body_syarat_dokumen,
            data_text: body_data_text,
          };
          url = baseUrl + "/api/pelayanan/category/update";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "pelayanan_postApiPelayananCategoryDelete": {
          const body_id = this.getNodeParameter("body_id", i, "") as any;
          const body = { id: body_id };
          url = baseUrl + "/api/pelayanan/category/delete";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "mcp_getApiPelayanan": {
          const body = undefined;
          url = baseUrl + "/api/pelayanan/";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "mcp_getApiPelayananDetail": {
          const query_id = this.getNodeParameter("query_id", i, "") as string;

          const body = undefined;
          url = baseUrl + "/api/pelayanan/detail";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
            params: { id: query_id },
          };
          break;
        }

        case "mcp_postApiPelayananCreate": {
          const body_id_category = this.getNodeParameter(
            "body_id_category",
            i,
            "",
          ) as any;
          const body_id_warga = this.getNodeParameter(
            "body_id_warga",
            i,
            "",
          ) as any;
          const body_phone = this.getNodeParameter("body_phone", i, "") as any;
          const body_data_text = this.getNodeParameter(
            "body_data_text",
            i,
            "",
          ) as any;
          const body_syarat_dokumen = this.getNodeParameter(
            "body_syarat_dokumen",
            i,
            "",
          ) as any;
          const body = {
            id_category: body_id_category,
            id_warga: body_id_warga,
            phone: body_phone,
            data_text: body_data_text,
            syarat_dokumen: body_syarat_dokumen,
          };
          url = baseUrl + "/api/pelayanan/create";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "mcp_postApiPelayananUpdate_status": {
          const body_id = this.getNodeParameter("body_id", i, "") as any;
          const body_status = this.getNodeParameter(
            "body_status",
            i,
            "",
          ) as any;
          const body_keterangan = this.getNodeParameter(
            "body_keterangan",
            i,
            "",
          ) as any;
          const body_id_user = this.getNodeParameter(
            "body_id_user",
            i,
            "",
          ) as any;
          const body = {
            id: body_id,
            status: body_status,
            keterangan: body_keterangan,
            id_user: body_id_user,
          };
          url = baseUrl + "/api/pelayanan/update-status";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "apikey_postApiApikeyCreate": {
          const body_name = this.getNodeParameter("body_name", i, "") as any;
          const body_description = this.getNodeParameter(
            "body_description",
            i,
            "",
          ) as any;
          const body = { name: body_name, description: body_description };
          url = baseUrl + "/api/apikey/create";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "apikey_getApiApikeyList": {
          const body = undefined;
          url = baseUrl + "/api/apikey/list";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "apikey_deleteApiApikeyDelete": {
          const body_id = this.getNodeParameter("body_id", i, "") as any;
          const body = { id: body_id };
          url = baseUrl + "/api/apikey/delete";
          method = "delete";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "darmasaba_getApiDarmasabaRepos": {
          const body = undefined;
          url = baseUrl + "/api/darmasaba/repos";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "darmasaba_getApiDarmasabaLs": {
          const body = undefined;
          url = baseUrl + "/api/darmasaba/ls";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "darmasaba_getApiDarmasabaLsByDir": {
          const body = undefined;
          url = baseUrl + "/api/darmasaba/ls/{dir}";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "darmasaba_getApiDarmasabaFileByDirByFile_name": {
          const body = undefined;
          url = baseUrl + "/api/darmasaba/file/{dir}/{file_name}";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "darmasaba_getApiDarmasabaList_pengetahuan_umum": {
          const body = undefined;
          url = baseUrl + "/api/darmasaba/list-pengetahuan-umum";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "darmasaba_getApiDarmasabaPengetahuan_umumByFile_name": {
          const body = undefined;
          url = baseUrl + "/api/darmasaba/pengetahuan-umum/{file_name}";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "darmasaba_postApiDarmasabaBuat_pengaduan": {
          const body_jenis_laporan = this.getNodeParameter(
            "body_jenis_laporan",
            i,
            "",
          ) as any;
          const body_name = this.getNodeParameter("body_name", i, "") as any;
          const body_phone = this.getNodeParameter("body_phone", i, "") as any;
          const body_detail = this.getNodeParameter(
            "body_detail",
            i,
            "",
          ) as any;
          const body = {
            jenis_laporan: body_jenis_laporan,
            name: body_name,
            phone: body_phone,
            detail: body_detail,
          };
          url = baseUrl + "/api/darmasaba/buat-pengaduan";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "darmasaba_postApiDarmasabaStatus_pengaduan": {
          const body_name = this.getNodeParameter("body_name", i, "") as any;
          const body_phone = this.getNodeParameter("body_phone", i, "") as any;
          const body = { name: body_name, phone: body_phone };
          url = baseUrl + "/api/darmasaba/status-pengaduan";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "credential_postApiCredentialCreate": {
          const body_name = this.getNodeParameter("body_name", i, "") as any;
          const body_value = this.getNodeParameter("body_value", i, "") as any;
          const body = { name: body_name, value: body_value };
          url = baseUrl + "/api/credential/create";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "credential_getApiCredentialList": {
          const body = undefined;
          url = baseUrl + "/api/credential/list";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "credential_deleteApiCredentialRm": {
          const body_id = this.getNodeParameter("body_id", i, "") as any;
          const body = { id: body_id };
          url = baseUrl + "/api/credential/rm";
          method = "delete";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "user_getApiUserFind": {
          const body = undefined;
          url = baseUrl + "/api/user/find";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "user_postApiUserUpsert": {
          const body_name = this.getNodeParameter("body_name", i, "") as any;
          const body_phone = this.getNodeParameter("body_phone", i, "") as any;
          const body = { name: body_name, phone: body_phone };
          url = baseUrl + "/api/user/upsert";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "layanan_getApiLayananList": {
          const body = undefined;
          url = baseUrl + "/api/layanan/list";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "layanan_postApiLayananCreate_ktp": {
          const body_jenis = this.getNodeParameter("body_jenis", i, "") as any;
          const body_nama = this.getNodeParameter("body_nama", i, "") as any;
          const body_deskripsi = this.getNodeParameter(
            "body_deskripsi",
            i,
            "",
          ) as any;
          const body = {
            jenis: body_jenis,
            nama: body_nama,
            deskripsi: body_deskripsi,
          };
          url = baseUrl + "/api/layanan/create-ktp";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "layanan_postApiLayananStatus_ktp": {
          const body_uniqid = this.getNodeParameter(
            "body_uniqid",
            i,
            "",
          ) as any;
          const body = { uniqid: body_uniqid };
          url = baseUrl + "/api/layanan/status-ktp";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "aduan_postApiAduanCreate": {
          const body_title = this.getNodeParameter("body_title", i, "") as any;
          const body_description = this.getNodeParameter(
            "body_description",
            i,
            "",
          ) as any;
          const body = { title: body_title, description: body_description };
          url = baseUrl + "/api/aduan/create";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "aduan_postApiAduanAduan_sampah": {
          const body_judul = this.getNodeParameter("body_judul", i, "") as any;
          const body_deskripsi = this.getNodeParameter(
            "body_deskripsi",
            i,
            "",
          ) as any;
          const body = { judul: body_judul, deskripsi: body_deskripsi };
          url = baseUrl + "/api/aduan/aduan-sampah";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "aduan_getApiAduanList_aduan_sampah": {
          const body = undefined;
          url = baseUrl + "/api/aduan/list-aduan-sampah";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "auth_postAuthLogin": {
          const body_email = this.getNodeParameter("body_email", i, "") as any;
          const body_password = this.getNodeParameter(
            "body_password",
            i,
            "",
          ) as any;
          const body = { email: body_email, password: body_password };
          url = baseUrl + "/auth/login";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "auth_deleteAuthLogout": {
          const body = undefined;
          url = baseUrl + "/auth/logout";
          method = "delete";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "MCP_Server_postMcp": {
          const body = undefined;
          url = baseUrl + "/mcp";
          method = "post";
          axiosConfig = {
            headers: finalHeaders,

            data: body,
          };
          break;
        }

        case "MCP_Server_getMcpTools": {
          const body = undefined;
          url = baseUrl + "/mcp/tools";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "MCP_Server_getMcpStatus": {
          const body = undefined;
          url = baseUrl + "/mcp/status";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "MCP_Server_getHealth": {
          const body = undefined;
          url = baseUrl + "/health";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        case "MCP_Server_getMcpInit": {
          const body = undefined;
          url = baseUrl + "/mcp/init";
          method = "get";
          axiosConfig = {
            headers: finalHeaders,
          };
          break;
        }

        default:
          throw new Error("Unknown operation: " + operation);
      }

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
