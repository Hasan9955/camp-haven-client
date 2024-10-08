import { baseApi } from "../../api/baseApi";



export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (productInfo) => ({
                url: '/products/',
                method: "POST",
                body: productInfo
            })
        }),
        getProducts: builder.query({
            query: (query) => {
                return {
                    url: '/products',
                    method: "GET",
                    params: query
                }
            }
        }),
        getTopSoldProducts: builder.query({
            query: () => {
                return {
                    url: '/products/topSoldProducts',
                    method: "GET"
                }
            }
        }),
        getRecommendedProducts: builder.query({
            query: () => {
                return {
                    url: '/products/recommendedProducts',
                    method: "GET"
                }
            }
        }),
        getSingleProduct: builder.query({
            query: (id) => {  
                return {
                    url: `/products/${id}`,
                    method: "GET"
                }
            }
        }),
        updateProduct: builder.mutation({
            query: (product) => {
                return {
                    url: `/products/${product.id}`,
                    method: "PUT",
                    body: product.data
                }
            }
        }),
        deleteProduct: builder.mutation({
            query: (id) => {
                return {
                    url: `/products/${id}`,
                    method: "DELETE"
                }
            }
        })
    })
})


export const { useAddProductMutation, useGetTopSoldProductsQuery, useGetProductsQuery, useGetSingleProductQuery, useDeleteProductMutation, useUpdateProductMutation, useGetRecommendedProductsQuery } = productApi;