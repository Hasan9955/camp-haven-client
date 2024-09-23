import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/product/productApi";
import { useEffect } from "react";




const BuyProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    useEffect(() => {
        if(!location.state){ 
            return navigate('/');
        }
    }, [location.state, navigate])
    const productData = location.state;
    const {data, isError, isLoading} = useGetSingleProductQuery(productData?.productId ? productData?.productId : '')
    if (isLoading) {
        return <div className="flex justify-center items-center mt-32">
            <span className="loading loading-spinner text-blue-500 size-16"></span>
        </div>
    }

    if (isError) { 
        return <div>
            <p className="text-red-500 text-center text-xl md:text-3xl">An error is going on!!!</p>
            <Link to={'/'}><button className="btn bg-blue-500 text-white">Go Home</button></Link>
        </div>
    }
    console.log(data.data);
    return (
        <div>
            this is buy product page
        </div>
    );
};

export default BuyProduct;