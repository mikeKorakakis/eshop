// src/api/index.ts
import createClient from "openapi-fetch";
import { paths } from "@/types/api-types";

const client = (bearer: string | undefined) => createClient<paths>({
  baseUrl: "http://127.0.0.1:8000/api/",
  headers: {
    Accept: "application/json",
	Authorization: `Bearer ${bearer}`,
  },
  credentials: "include",
  
});

export { client };
