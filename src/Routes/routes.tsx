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
import PrivateRoute from "./PrivateRoute";


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
                element: <PrivateRoute><AddProduct /></PrivateRoute>
            },
            {
                path: 'shop',
                element: <Shop />
            },
            {
                path: 'cart',
                element: <PrivateRoute><Cart /></PrivateRoute>
            },
            {
                path: 'productManagement',
                element: <PrivateRoute>
                    <ProductManagement />
                    </PrivateRoute>
            }, 
            {
                path: 'buyProduct',
                element: <PrivateRoute>
                    <BuyProduct />
                </PrivateRoute>
            },
            {
                path: 'successPage',
                element: <PrivateRoute>
                    <SuccessPage />
                </PrivateRoute>
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
                   
                    return result 
                }
            },
            {
                path: '/updateProduct/:id',
                element: <PrivateRoute>
                    <UpdateProduct />
                </PrivateRoute>,
                loader: async ({ params }) => {
                    const result = await store.dispatch(productApi.endpoints.getSingleProduct.initiate(params.id)) 
                    return result 
                }
            },
        ]
    }

])


export default router;