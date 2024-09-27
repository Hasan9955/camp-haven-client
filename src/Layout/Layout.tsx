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

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (location.pathname === '/cart') {
        event.preventDefault();
        event.returnValue = ''; 
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener when the component unmounts or the route changes
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location]);

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