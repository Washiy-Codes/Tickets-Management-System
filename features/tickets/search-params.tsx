// export type searchParams = {
//         search:string | string[] | undefined,
//         sort:string | string[] | undefined
    
// }

// import {createSearchParamsCache, parseAsString} from "nuqs/server"

// export const searchParamsCache = createSearchParamsCache({
//   search: parseAsString.withDefault(""),
//   sort: parseAsString.withDefault("newest")
// });

// export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>


import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(""),
  sort: parseAsString.withDefault("newest")
});

// Explicitly type out the object shape to override any automated Next.js 15 Promise contamination
export type ParsedSearchParams = {
  search: string;
  sort: string;
};
