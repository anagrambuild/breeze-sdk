"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// packages/sdk/tests/sdk.test.ts
var import_node_test = __toESM(require("test"));

// packages/sdk/src/builder.ts
var BASE_URL = "http://localhost:8080/";
var ApiClient = class {
  constructor(baseUrl = BASE_URL) {
    this.baseUrl = baseUrl;
  }
  async request(endpoint, method, options = {}) {
    const { headers = {}, body } = options;
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      ...body ? { body: JSON.stringify(body) } : {}
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
  }
};

// packages/sdk/src/transactionForDeposit/index.ts
async function getTransactionForDeposit(api_client, api_key, fund_id, amount, all, user_key) {
  const headers = {
    "api-key": api_key
  };
  let body_content = {
    params: {
      fund_id,
      amount,
      all,
      user_key
    }
  };
  return await api_client.request(`deposit/tx`, "POST", {
    headers,
    body: body_content
  });
}

// packages/sdk/tests/sdk.test.ts
(0, import_node_test.describe)("transactionForDeposit Tests", () => {
  const apiClient = new ApiClient();
  (0, import_node_test.default)("should create deposit transaction", async () => {
    const result = await getTransactionForDeposit(
      apiClient,
      "userkey_0000",
      "fund_12855430823",
      20,
      false,
      "HeZe5JDSvLdfkVxTSuhRZsryhGk1u3nsAb9eA554uXVT"
    );
    expect(result.success).toBe(true);
    expect(result.result).toEqual(expect.any(String));
  });
});
