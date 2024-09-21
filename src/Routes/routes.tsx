import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Layout from "../Layout/Layout";
import Login from "../Pages/Login";
import SignUp from "../Pages/signUp";
import AddProduct from "../Pages/AddProduct";
import Error from "../Pages/Error";
import Shop from "../Pages/Shop"; 
import { productApi } from "../redux/features/product/productApi";
import { store } from "../redux/store"; 
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import ProductManagement from "../Pages/ProductManagement";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signUp',
                element: <SignUp />
            },
            {
                path: 'addProduct',
                element: <AddProduct />
            },
            {
                path: 'shop',
                element: <Shop />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'productManagement',
                element: <ProductManagement />
            },
            {
                path: '/productDetails/:id',
                element: <ProductDetails />,
                loader: async ({ params }) => {
                    const result = await store.dispatch(productApi.endpoints.getSingleProduct.initiate(params.id))
                    console.log(result); 
                    return result 
                }
            }
        ]
    }

])


export default router;