
import { createApi } from "@reduxjs/toolkit/query/react";
import { determineTag, tagTypes } from "./apiTags";
import { customBaseQuery } from "./customBaseQuery";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: customBaseQuery,
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: import.meta.env.VITE_API_URL,
// 		// baseUrl: '/api',
// 		prepareHeaders: (headers, { getState }) => {
// 			const token = (getState() as RootState).auth.token;
// 			if (token) {
// 				headers.set("authorization", `Bearer ${token}`);
				
// 			}
// 			// headers.set("Content-Type", "application/json");
// 			// headers.set("Content-Type", "multipart/form-data");
//  if (!(meta?.arg?.body instanceof FormData)) {
//     headers.set("Content-Type", "application/json");
//   } else {
//     headers.delete("Content-Type"); // Let browser set it
//   }

// 			return headers;
// 		},
// 	}),
	// baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3003' }),
	tagTypes: tagTypes,
	refetchOnMountOrArgChange: true,
	endpoints: (builder) => ({
		getEndpoint: builder.query({
			query: (url) => url,
			providesTags: (_result, _error, arg) => [{ type: determineTag(arg) }],
			// keepUnusedDataFor: 60,
		}),

		invalidateEndpoint: builder.mutation({
			query: ({ url, method, body }) => ({
				url,
				method,
				...(body && { body }),
			}),

			invalidatesTags: (_result, _error, { url }) => [
				{ type: determineTag(url) },
			],
		}),
	}),
});

export const { useGetEndpointQuery,useLazyGetEndpointQuery,  useInvalidateEndpointMutation} = apiSlice;
