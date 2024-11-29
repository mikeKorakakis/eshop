// src/api/index.ts
import createClient from "openapi-fetch";
import { paths } from "@/types/api-types";

const client = createClient<paths>({
  baseUrl: "http://127.0.0.1:8000/api/",
  headers: {
    Accept: "application/json",
  },
});

export { client };
