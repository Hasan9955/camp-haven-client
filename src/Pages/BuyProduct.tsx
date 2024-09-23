import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/product/productApi";
import { FormEvent, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useCreateOrderMutation } from "../redux/features/order/orderApi";
import { toast } from "react-toastify";
import { TProduct } from "../interface/product.interface";




const BuyProduct = () => {
    const location = useLocation();
    const [createOrder] = useCreateOrderMutation();
    const user = useAppSelector(selectCurrentUser)
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!location.state) {
            return navigate('/');
        }
    }, [location.state, navigate])
    const loaderData = location.state;
    const { data, isError, isLoading } = useGetSingleProductQuery(loaderData?.productId ? loaderData?.productId : '')
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

    const productData: TProduct = data?.data
    const subtotal = productData.price * loaderData.quantity




    
    const handleOrder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(loaderData.quantity > productData.quantity){
            return toast.error('Product is not available')
        }else {
        const form = e.currentTarget;
        const address = (form.elements.namedItem('address') as HTMLInputElement).value;
        const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
        const orderInfo = {
            userId: user?.userId,
            productId: productData?._id,
            quantity: loaderData?.quantity,
            cartId: loaderData?.cartId || '',
            totalCost: subtotal,
            address,
            phone
            }
            
        try {
            const res = await createOrder(orderInfo)
            console.log(res); 
            navigate('/successPage', {
                state: {
                    name: productData.name,
                    img: productData.photo, 
                    quantity: loaderData.quantity,
                    totalCost: subtotal
                }
            })
        } catch (error) {
            console.log(error);
            
        }
    }
    }

    
    return (
        <div>
            <h2 className="text-2xl my-2 ml-5">{productData.name}</h2>
            <div className="flex">
                <form onSubmit={handleOrder} className="md:w-1/2 p-5 border-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" readOnly defaultValue={user?.name} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" readOnly defaultValue={user?.email} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input type="text" name="phone" placeholder="Your Phone No." className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input type="text" name="address" placeholder="Your Address" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <h2 className="text-xl my-4 font-bold">Payment</h2>
                        <div className="flex gap-10 mb-3">
                            <p>Cash On Delivery</p>
                            <input type="radio" name="radio-1" className="border border-blue-500 checked:bg-blue-500 radio" defaultChecked />
                        </div>
                        <div className="flex gap-5">
                            <p>Use Online payment</p>
                            <input type="radio" name="radio-1" className="radio border border-black" disabled />
                        </div>
                    </div>
                    <div className="form-control flex justify-center items-center mt-5">
                        <button className="btn bg-blue-500 text-white">Order Now</button>
                    </div>
                </form>


                <div className="w-1/2 max-w-xl mx-auto p-4">
                     <div className="flex items-start border-b pb-4 mb-4">
                        <img src={productData.photo} alt="Jump Rope" className="w-12 h-12 object-cover rounded-md mr-4" />
                        <div className="flex-1">
                            <h2 className="text-lg font-medium">{productData.name}</h2>
                            <p className="text-sm text-gray-500">Quantity: {loaderData.quantity}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold text-blue-500">${productData.price}</p>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-500">Subtotal</p>
                        <p className="text-lg font-semibold">${subtotal}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-500">Shipping</p>
                        <p className="text-lg font-semibold">$17</p>
                    </div>
                    
                    <div className="flex justify-between items-center font-semibold text-lg border-t pt-4">
                        <p>Total</p>
                        <p>${subtotal + 17}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BuyProduct;