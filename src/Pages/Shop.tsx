import { FormEvent, useEffect, useRef, useState } from "react";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import ProductCard from "../Components/ProductCard";
import { TProduct } from "../interface/product.interface";
import img from '../assets/no-magento-product-found.jpg';
import { Link, useLocation } from "react-router-dom";

type TQuery = {
    filter?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
};

const Shop = () => {
    
    const location = useLocation();
    
    const [query, setQuery] = useState<TQuery>({
        category: location.state || '',
        minPrice: '',
        maxPrice: '',
        sort: '',
        filter: ''
    });

    const searchFormRef = useRef<HTMLFormElement>(null);
    const filterFormRef = useRef<HTMLFormElement>(null);

    const { data, isError, isLoading } = useGetProductsQuery(query, {
        refetchOnMountOrArgChange: true,
    }); 

     const [products, setProducts] = useState<TProduct[]>([]);

     useEffect(() => {
        if (data?.data) {
            setProducts(data.data);
        } 
    }, [data]);

    
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const filter = (form.elements.namedItem("search") as HTMLInputElement).value;

       
        updateQuery({ filter: filter || '' });
    };

    const handleFilter = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const category = (form.elements.namedItem("category") as HTMLInputElement).value;
        const minPrice = (form.elements.namedItem("minPrice") as HTMLInputElement).value;
        const maxPrice = (form.elements.namedItem("maxPrice") as HTMLInputElement).value;
        const sort = (form.elements.namedItem("sort") as HTMLInputElement).value;

        const queryData: TQuery = {
            category: category || '',
            minPrice: minPrice || '',
            maxPrice: maxPrice || '',
            sort: sort ? (sort === 'asc' ? 'asc' : 'desc') : '',  // Ensure proper sorting values
        };

        updateQuery(queryData);
    };

    
    const updateQuery = (newQuery: Partial<TQuery>) => {
        setQuery((prevQuery) => ({
            ...prevQuery,
            ...newQuery
        }));
    };

   
    const clearFilters = () => {
       
        setQuery({
            category: '',
            minPrice: '',
            maxPrice: '',
            sort: '',
            filter: ''
        });

        
        if (searchFormRef.current) {
            searchFormRef.current.reset();
        }

       
        if (filterFormRef.current) {
            filterFormRef.current.reset();
        }
    };

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
        <div className="">
            {/* Search Bar */}
            <div className="flex justify-center items-center text-center">
                <form onSubmit={handleSearch} ref={searchFormRef} className="max-w-lg mx-auto relative">
                    <input
                        type="text"
                        placeholder="Search by product name"
                        name="search"
                        className="input input-bordered border-r-0 border-blue-500 input-sm md:input-md w-64 md:w-80 lg:w-96 mt-5"
                    />
                    <button type="submit" className="border border-l-0 rounded-l-none border-blue-500 text-blue-500 btn btn-sm md:btn-md absolute right-0 bottom-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
            </div>

            {/* Filter Section */}
            <div className="flex flex-row justify-between items-center bg-base-100 shadow-xl p-5">
                <p className="text-lg md:text-3xl">Total products: {products?.length} </p>
                <div className="dropdown dropdown-end">
                    <button className="btn btn-sm md:btn-md bg-blue-500 text-white">Filter</button>
                    <form onSubmit={handleFilter} ref={filterFormRef} className="menu dropdown-content bg-base-100 rounded-box z-[10] p-3 shadow  ">
                        {/* Category Filter */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Category</span>
                            </label>
                            <input type="text" placeholder="Enter category" name="category" className="input input-bordered rounded-none" />
                        </div>

                        {/* Price Range Filter */}
                        <label className="label">
                            <span className="label-text text-black">Price</span>
                        </label>
                        <div className="flex justify-center items-center gap-3">
                            <div className="form-control">
                                <input type="number" placeholder="Min price" name="minPrice" className="input max-w-40 input-bordered rounded-none" />
                            </div>
                            <p className="text-xl">to</p>
                            <div className="form-control">
                                <input type="number" placeholder="Max price" name="maxPrice" className="input max-w-40 input-bordered rounded-none" />
                            </div>
                        </div>

                        {/* Sort Products */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Arrange products</span>
                            </label>
                            <select className="select select-bordered w-full" name="sort">
                                <option defaultChecked value="">Sort by</option>
                                <option value="asc">Price low to high</option>
                                <option value="desc">Price high to low</option>
                            </select>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex gap-2 mt-4 mx-auto justify-between">
                            <button type="submit" className="btn bg-blue-500 text-white">Filter</button>
                            <button type="button" onClick={clearFilters} className="btn bg-red-500 text-white max-w-40">Clear All</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div>
                {products.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
                        {products.map((item: TProduct, index: number) => (
                            <ProductCard key={index} product={item} />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center mt-5">
                        <img className="object-cover" src={img} alt="NoProduct" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
