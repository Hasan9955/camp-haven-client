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
            query: (productQuery) => {
                const params = new URLSearchParams()
                if(productQuery){
                    params.append('query', productQuery)
                }
                return {
                    url: '/products/',
                    method: "GET",
                    params: params
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


export const { useAddProductMutation, useGetProductsQuery, useGetSingleProductQuery, useDeleteProductMutation, useUpdateProductMutation } = productApi;