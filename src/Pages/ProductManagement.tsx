import { useDeleteProductMutation, useGetProductsQuery } from "../redux/features/product/productApi";
import { TProduct } from "../interface/product.interface";
import { AiFillDelete, AiOutlineFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GrDocumentUpdate } from "react-icons/gr";
import Swal from "sweetalert2";


const ProductManagement = () => {


    const { data, isError, isLoading, refetch } = useGetProductsQuery('', {
        refetchOnMountOrArgChange: true
    });
    const [deleteProduct] = useDeleteProductMutation();

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

    const handleDelete = (id: string) => { 
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteProduct(id) 
                if(res.data.success){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "success"
                    });
                }
                refetch();
            }
        });
        
    }

    return (
        <div className="mt-4">
            <div className="flex flex-col justify-center items-center space-y-4">
                <p className="text-2xl lg:text-4xl text-center font-bold">Manage Your Products</p>
                <Link to={'/addProduct'}>
                    <button className="btn bg-blue-500 text-white rounded-md"><AiOutlineFileAdd className="text-xl" /> Add Product</button>
                </Link>
            </div>
            {
                data.data.length > 0 && <div className="px-4">
                    {
                        data.data.map((product: TProduct) => <div key={product._id} className="flex flex-col md:flex-row justify-between md:items-center rounded-xl max-w-4xl border shadow-xl mt-10 p-10 md:px-5 md:py-0 mx-auto">
                            <div className="flex md:items-center flex-col md:flex-row md:space-x-3 max-w-[450px]">
                                <div className=" ">
                                    <img className="rounded-lg w-full md:w-56 mb-5 md:mb-0 " src={product.photo} alt="" />
                                </div>
                                <div className=" ">
                                    <div className="text-xl font-bold max-w-[250px]">{product.name}</div>
                                    <p>Brand: {product.brand}</p>
                                    <p>Category: {product.category}</p>

                                    {/* Quantity */}
                                    <p className="font-bold ">Stock: {product.quantity} items</p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-lg font-bold text-blue-800">Price: $ {product.price}</p>
                                <div className="flex items-center mt-2 gap-2">
                                    <Link to={`/updateProduct/${product._id}`}>
                                    <button title="Update"  className="btn bg-green-500 text-white  text-xl"><GrDocumentUpdate /></button>
                                    </Link>
                                    <button title="Delete" onClick={() => handleDelete(product._id)} className="btn bg-red-500 text-white  text-xl"><AiFillDelete /></button>
                                </div>
                            </div>

                        </div>)
                    }
                </div>}
        </div>
    );
};

export default ProductManagement;