import { baseApi } from './../../api/baseApi';


const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderInfo) => ({
                url: '/orders',
                method: "POST",
                body: orderInfo
            })
        })
    })
})

export const { useCreateOrderMutation } = orderApi;