"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WibuApi = void 0;
class WibuApi {
    constructor() {
        this.name = "wibuApi";
        this.displayName = "Wibu API (Bearer Token)";
        this.properties = [
            {
                displayName: "Base URL",
                name: "baseUrl",
                type: "string",
                default: "",
                placeholder: "https://api.example.com",
                description: "Masukkan URL dasar API tanpa garis miring di akhir",
                required: true,
            },
            {
                displayName: "Bearer Token",
                name: "token",
                type: "string",
                default: "",
                typeOptions: { password: true },
                description: "Masukkan token autentikasi Bearer (tanpa 'Bearer ' di depannya)",
                required: true,
            },
        ];
    }
}
exports.WibuApi = WibuApi;
