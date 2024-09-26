import { TProduct } from "../interface/product.interface";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import ProductCard from "./ProductCard";
import Title from "./Title";


const RecommendedProducts = () => {
    

    const {data, isLoading, isError} = useGetProductsQuery(undefined);
    

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        console.error(isError);
        return <p>An error occurred!</p>;
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