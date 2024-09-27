import ProductCard from "./ProductCard";
import { TProduct } from "../interface/product.interface";
import { useGetTopSoldProductsQuery } from "../redux/features/product/productApi";
import Title from "./Title";
import { Link } from "react-router-dom";


const TopSoldProducts = () => {

    const { data, isLoading, isError } = useGetTopSoldProductsQuery(undefined);


    if (isLoading) {
        return <div className="flex justify-center items-center mt-32">
            <span className="loading loading-spinner text-blue-500 size-16"></span>
        </div>
    }

    if (isError) {
        return <div className="flex justify-center items-center flex-col space-y-4">
            <p className="text-red-500 text-center text-xl md:text-3xl">An error is going on!!!</p>
            <Link to={'/'}><button className="btn bg-blue-500 text-white">Go Home</button></Link>
        </div>
    }
    return (
        <> 
            <Title title="Best Selling Products" subtitle="Explore our top selling products!"/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-2 md:px-8">
                {
                    data?.data?.length && data?.data?.map((product: TProduct) => <div key={product?._id}>
                        <ProductCard product={product} />
                    </div>)
                }
            </div>
        </>
    );
};

export default TopSoldProducts;