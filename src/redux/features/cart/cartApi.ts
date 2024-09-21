import { baseApi } from "../../api/baseApi";


const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addCartProduct: builder.mutation({
            query: (data) => ({
                url: '/cart/',
                method: "POST",
                body: data
            })
        }),
        getCartProduct: builder.query({
            query: (userId) => ({
                url: `/cart/${userId}`,
                method: "GET",
            })
        }),
        updateCartProduct: builder.mutation({
            query: (data) => ({
                url: `/cart/${data.id}`,
                method: "PUT",
                body: {quantity: data.quantity}
            })
        }),
        deleteCartProduct: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: "DELETE"
            })
        })
    })
})


export const { useAddCartProductMutation, useGetCartProductQuery, useDeleteCartProductMutation, useUpdateCartProductMutation } = cartApi;