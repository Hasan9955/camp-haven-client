import ProductCard from "./ProductCard";
import { TProduct } from "../interface/product.interface";
import { useGetTopSoldProductsQuery } from "../redux/features/product/productApi";
import Title from "./Title";


const TopSoldProducts = () => {

    const { data, isLoading, isError } = useGetTopSoldProductsQuery(undefined);


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        console.error(isError);
        return <p>An error occurred!</p>;
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