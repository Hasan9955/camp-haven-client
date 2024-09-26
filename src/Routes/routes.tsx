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
import UpdateProduct from "../Pages/UpdateProduct";
import BuyProduct from "../Pages/BuyProduct";
import SuccessPage from "../Pages/SuccessPage";
import AboutUs from "../Pages/AboutUs";


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
                path: 'buyProduct',
                element: <BuyProduct />
            },
            {
                path: 'successPage',
                element: <SuccessPage />
            },
            {
                path: 'about',
                element: <AboutUs />
            },
            {
                path: '/productDetails/:id',
                element: <ProductDetails />,
                loader: async ({ params }) => {
                    const result = await store.dispatch(productApi.endpoints.getSingleProduct.initiate(params.id))
                    console.log(result); 
                    return result 
                }
            },
            {
                path: '/updateProduct/:id',
                element: <UpdateProduct />,
                loader: async ({ params }) => {
                    const result = await store.dispatch(productApi.endpoints.getSingleProduct.initiate(params.id)) 
                    return result 
                }
            },
        ]
    }

])


export default router;