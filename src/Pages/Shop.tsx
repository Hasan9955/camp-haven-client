import { useState } from "react";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import ProductCard from "../Components/ProductCard";
import { TProduct } from "../interface/product.interface";

const Shop = () => {

    const [query, setQuery] = useState('');
    const {data, isError, isLoading} = useGetProductsQuery(query);
     
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        console.log(isError);
        return <p>An error is going on!!!</p>
    }
    console.log(data);

    return (
        <div className="text-xl">
            Total product: {data?.data?.length} 
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
            {
                data && data.data.map((item: TProduct, index: number) => <ProductCard key={index} product={item} />)
            }
            </div>
        </div>
    );
};

export default Shop;