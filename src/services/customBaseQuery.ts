import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { RootState } from "@store/index";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `  ${import.meta.env.VITE_API_URL}/api`,
  // baseUrl:"/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// 👇 Wrapper to inspect the body and set headers conditionally
export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const modifiedArgs = typeof args === "string" ? { url: args } : { ...args };

  // Normalize headers to an object to make handling easier
  let headersObj: Record<string, string> = {};

  if (modifiedArgs.headers instanceof Headers) {
    // Convert Headers instance to plain object
    modifiedArgs.headers.forEach((value, key) => {
      headersObj[key] = value;
    });
  } else if (Array.isArray(modifiedArgs.headers)) {
    // Convert array of tuples to object
    for (const [key, value] of modifiedArgs.headers) {
      headersObj[key] = value;
    }
  } else if (
    typeof modifiedArgs.headers === "object" &&
    modifiedArgs.headers !== null
  ) {
    // It's already an object
    headersObj = { ...modifiedArgs.headers } as Record<string, string>;
  }

  // Now set or delete Content-Type as needed
  if (!(modifiedArgs.body instanceof FormData)) {
    headersObj["Content-Type"] = "application/json";
  } else {
    delete headersObj["Content-Type"];
  }

  // Assign normalized headers back to modifiedArgs
  modifiedArgs.headers = headersObj;

  return rawBaseQuery(modifiedArgs, api, extraOptions);
};
