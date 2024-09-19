import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

const Layout = () => {

    const location = useLocation();

    useEffect(() =>{
        window.scrollTo(0, 0)
    },[location.pathname])


    return (
        <div>
            <Navbar />
            <Outlet />
            <ToastContainer />
            <Footer />
        </div>
    );
};

export default Layout;