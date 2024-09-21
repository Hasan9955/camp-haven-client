import { useEffect, useState } from "react";
import { selectCurrentUser, TUser } from "../redux/features/auth/authSlice";

import { useAppSelector } from "../redux/hooks";
import { useDeleteCartProductMutation, useGetCartProductQuery, useUpdateCartProductMutation } from "../redux/features/cart/cartApi";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { TProduct } from "../interface/product.interface";
import Swal from "sweetalert2";

interface ProductInterface {
    productId: TProduct;
    userId: TUser;
    quantity: number;
    _id: string;
}
const Cart = () => {

    const [products, setProducts] = useState<ProductInterface[]>([]);
    const user = useAppSelector(selectCurrentUser)
    const { data, isLoading, isError, refetch } = useGetCartProductQuery(user?.userId, {
        refetchOnMountOrArgChange: true
    });
    const [deleteCartProduct] = useDeleteCartProductMutation();
    const [updateCartProduct] = useUpdateCartProductMutation();


    const handleQuantity = async (id: string, quantity: number) => {
        const data = {
            id,
            quantity
        }
        await updateCartProduct(data)
        refetch();
    }


    useEffect(() => {
        if (data) {
            setProducts(data.data);
        }
    }, [data]);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        console.log(isError);
        return <p>An error is going on!!!</p>
    }

    // console.log(products);

    const handleDelete = async (id: string) => {
        const res = await deleteCartProduct(id)
        console.log(res);
        if (res.data.data.deletedCount > 0) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Item removed successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    }

    const handlePurchase = () => {

    }

    return (
        <div>
            {
                products.length > 0 ? <div>
                    {
                        products.map(product => <div key={product.productId._id} className="flex flex-col md:flex-row justify-between md:items-center rounded-xl max-w-4xl border shadow-xl mt-10 px-5 mx-auto">
                            <div className="flex md:items-center flex-col md:flex-row md:space-x-3 max-w-[450px]">
                                <div className=" ">
                                    <Link to={`/productDetails/${product.productId._id}`}><img className="rounded-lg w-full md:w-56 mb-5 md:mb-0" src={product.productId.photo} alt="" /></Link>
                                </div>
                                <div className=" ">
                                    <Link to={`/productDetails/${product.productId._id}`}><div className="text-xl font-bold max-w-[250px]">{product.productId.name}</div></Link>
                                    <p>Brand: {product.productId.brand}</p>

                                    {/* Quantity */}
                                    <div className="flex justify-normal items-center max-w-40 gap-5">
                                        <p className="font-bold ">Quantity:</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <button
                                                disabled={product.quantity <= 1}
                                                onClick={() => {
                                                    if (product.quantity > 1) {
                                                        const quantity = product.quantity - 1
                                                        handleQuantity(product._id, quantity)
                                                    }
                                                }}
                                                className="px-4 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-l rounded-none btn btn-sm">
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                value={product.quantity}
                                                readOnly
                                                className="w-12 input-sm text-center py-2 bg-gray-100 border border-gray-300" />
                                            <button
                                                disabled={product.productId.quantity <= product.quantity}
                                                onClick={() => {
                                                    const quantity = product.quantity + 1
                                                    handleQuantity(product._id, quantity)
                                                }}
                                                className="btn btn-sm px-4 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-r rounded-none">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-lg font-bold text-blue-800">Price: $ {product.productId.price}</p>
                                Subtotal: ${(parseInt(product.productId.price)) * product.quantity}
                                <div className="flex items-center mt-2 gap-2">
                                    <button onClick={handlePurchase} className="btn bg-blue-500 text-white rounded-none">Buy Now</button>
                                    <button onClick={() => handleDelete(product._id)} className="btn bg-red-500 text-white  text-xl"><AiFillDelete /></button>
                                </div>
                                {/* <button onClick={() => handleDelete(product._id)} className="border-2 rounded-full px-1 py-1 mt-4 w-24 flex justify-center items-center border-blue-500 hover:bg-black hover:text-white hover:border-black click"><AiFillDelete className="text-xl mr-1"></AiFillDelete><p>Delete</p></button> */}
                            </div>

                        </div>)
                    }
                </div> :
                    <div className="flex flex-col text-center justify-center  items-center mb-20 p-2">
                        <img className=" md:w-1/2" src="https://i.ibb.co/j6MBkVs/image.webp" alt="" />
                        <h2 className="text-2xl md:text-3xl lg:text-4xl text-amber-800">Your cart is currently empty.</h2>
                        <p className="max-w-xl text-sm font-bold"> Feel free to browse our products and add items to your cart whenever you are ready to make a purchase.
                        </p>
                        <span className="md:text-3xl text-2xl lg:text-4xl text-blue-500 mb-5">Happy shopping!</span>
                        <Link to='/'>
                            <button className="btn rounded-full bg-blue-500 text-white">Go Home</button>
                        </Link>
                    </div>
            }
        </div>
    );
};

export default Cart;