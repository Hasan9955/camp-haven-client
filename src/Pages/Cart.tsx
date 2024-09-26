import { useEffect, useState } from "react";
import { selectCurrentUser, TUser } from "../redux/features/auth/authSlice";

import { useAppSelector } from "../redux/hooks";
import { useDeleteCartProductMutation, useGetCartProductQuery, useUpdateCartProductMutation } from "../redux/features/cart/cartApi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { TProduct } from "../interface/product.interface";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

interface ProductInterface {
    productId: TProduct;
    userId: TUser;
    quantity: number;
    _id: string;
}
const Cart = () => {

    const [products, setProducts] = useState<ProductInterface[]>([]);
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser)
    const { data, isLoading, isError, refetch } = useGetCartProductQuery(user?.userId);
    const [deleteCartProduct] = useDeleteCartProductMutation();
    const [updateCartProduct] = useUpdateCartProductMutation();


    window.onbeforeunload = function () {
        return "Data will be lost if you leave the page, are you sure?";
    };
    
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
        return <p>An error is going on!!!</p>
    }

    // console.log(products);

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
                const res = await deleteCartProduct(id)

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
        });

    }

    const handlePurchase = (cartId: string, productId: string, quantity: number, stock: number) => {
        if (stock < 1) {
            return toast.error('This item is not available')
        } else {
            navigate('/buyProduct', {
                state: {
                    cartId,
                    productId,
                    quantity

                }
            })
        }
    }

    return (
        <div className="px-4">
            {
                products.length > 0 ? <div>
                    {
                        products.map(product => <div key={product._id} className="flex flex-col md:flex-row justify-between md:items-center rounded-xl max-w-4xl border shadow-xl mt-10 p-10 md:p-5 md:py-0 mx-auto">
                            <div className="flex md:items-center flex-col md:flex-row md:space-x-3 max-w-[450px]">
                                <div className=" ">
                                    <Link to={`/productDetails/${product.productId._id}`}><img className="object-cover rounded-lg max-w-72 mx-auto md:w-56 mb-5 md:mb-0" src={product.productId.photo} alt="" /></Link>
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
                                Subtotal: ${product.productId.price * product.quantity}
                                <div className="flex items-center mt-2 gap-2">
                                    <button onClick={() => handlePurchase(product._id, product.productId._id, product.quantity, product.productId.quantity)} className="btn bg-blue-500 text-white rounded-none">Buy Now</button>
                                    <button onClick={() => handleDelete(product._id)} className="btn bg-red-500 text-white  text-xl"><AiFillDelete /></button>
                                </div>
                            </div>

                        </div>)
                    }
                </div> :
                    <div className="flex flex-col text-center justify-center  items-center mb-20 p-2">
                        <img className=" md:w-1/2" src="https://i.ibb.co/j6MBkVs/image.webp" alt="" />
                        <h2 className="text-2xl md:text-2xl mb-4 ">Your cart is currently empty.</h2>
                        <Link to='/shop'>
                            <button className="btn bg-blue-500 text-white">Start Shopping</button>
                        </Link>
                    </div>
            }
        </div>
    );
};

export default Cart;