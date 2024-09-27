import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://camp-haven-server.vercel.app/api/v1'}), 
    endpoints: () => ({ }),
    refetchOnMountOrArgChange: true
})
