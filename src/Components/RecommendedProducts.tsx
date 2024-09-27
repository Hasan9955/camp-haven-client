import { Link } from "react-router-dom";
import { TProduct } from "../interface/product.interface";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import ProductCard from "./ProductCard";
import Title from "./Title";


const RecommendedProducts = () => {
    

    const {data, isLoading, isError} = useGetProductsQuery(undefined);
    

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

    const getRecommendedProducts = data?.data?.filter((prod: TProduct) => prod.isRecommended === true)


    return (
        <> 
            <Title title="Recommended " subtitle="Recommended products from us!" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-2 md:px-8">
                {
                    getRecommendedProducts?.length && getRecommendedProducts?.map((product: TProduct) => <div key={product?._id}>
                        <ProductCard product={product} />
                    </div>)
                }
            </div>
        </>
    );
};

export default RecommendedProducts;