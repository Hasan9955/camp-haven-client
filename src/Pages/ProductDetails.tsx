import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TProduct } from "../interface/product.interface";
import { useRef, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAddCartProductMutation } from "../redux/features/cart/cartApi";
import { toast } from "react-toastify";
import '../App.css'

export type Response = {
    data: {
        data: TProduct;
    };
    isError: boolean;
    isLoading: boolean;
}

const ProductDetails = () => {

    const imageZoomRef = useRef<HTMLDivElement>(null);


    const [countQuantity, setCountQuantity] = useState(1);
    const navigate = useNavigate()
    const user = useAppSelector(selectCurrentUser)
    const [addCartProduct] = useAddCartProductMutation();
    const res = useLoaderData() as Response;
    const { data, isError, isLoading } = res;
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
    const { _id, name, description, photo, price, quantity: stock, brand, sold } = data.data;


    const handleAddCart = async (id: string) => {
        if (!user) {
            return navigate('/login', {
                state: `/productDetails/${id}`
            })
        }
        const productData = {
            productId: id,
            userId: user?.userId,
            quantity: countQuantity
        }
        if (stock < 1) {
            return toast.error('This item is not available')
        } else {
            const res = await addCartProduct(productData)
            if (res.data.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Product added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }


    const increaseCount = () => {
        if (countQuantity < stock) {
            setCountQuantity(countQuantity + 1)
        }
    };
    const decreaseCount = () => {
        if (countQuantity > 1) {
            return setCountQuantity(countQuantity - 1)
        };
    };

    const handlePurchase = (id: string, quantity: number) => {
        if (stock < 1) {
            return toast.error('This item is not available')
        } else {
            navigate('/buyProduct', {
                state: {
                    productId: id,
                    quantity: quantity
                }
            })
        }
    }


    const handleMouseMove = (event: React.MouseEvent) => {
        const imageZoom = imageZoomRef.current;
        if (!imageZoom) return;

        imageZoom.style.setProperty('--display', 'block');
        const pointer = {
            x: (event.nativeEvent.offsetX * 100) / imageZoom.offsetWidth,
            y: (event.nativeEvent.offsetY * 100) / imageZoom.offsetHeight,
        };
        imageZoom.style.setProperty('--zoom-x', `${pointer.x}%`);
        imageZoom.style.setProperty('--zoom-y', `${pointer.y}%`);

        console.log(pointer); // To see if the event fires correctly
    };

    const handleMouseOut = () => {
        const imageZoom = imageZoomRef.current;
        if (imageZoom) {
            imageZoom.style.setProperty('--display', 'none');
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row bg-base-100 my-10 md:mx-10">
                <div
                    id="imageZoom"
                    ref={imageZoomRef}
                    className=""
                    style={{
                        '--url': `url(${photo})`,
                        '--zoom-x': '0%',
                        '--zoom-y': '0%',
                        '--display': 'none',
                    } as React.CSSProperties}
                    onMouseMove={handleMouseMove}
                    onMouseOut={handleMouseOut}
                >
                    <img src={photo} alt="ProductImg" className=" " />
                </div>
                {/* <img className="w-[400px] lg:w-[600px] h-[230px] md:h-[300px] lg:h-[400px] rounded-xl" src={photo} alt="productIMG" /> */}
                <div className="p-2 lg:card-body flex flex-col">
                    <div className="space-y-3">
                        <h2 className="card-title mb-2">{name}</h2>
                        <h4 className="max-w-md ">{description}</h4>
                        <h4 className="font-bold ">Brand: {brand}</h4>
                        <h4 className="font-bold ">Availability: {stock > 0 ? <span className="bg-green-600 p-1 font-semibold text-xs text-white max-w-28">Many In Stock</span> : <span className="bg-red-600 p-1 font-semibold text-xs text-white max-w-28"> Out Of Stock </span>}</h4>
                        <h4 className="font-bold ">Total Sold: {sold} items</h4>
                        <h4 className="font-bold text-xl text-blue-600">Price: ${price}</h4>
                        <div className="flex justify-normal items-center max-w-40 gap-5">
                            <p className="font-bold ">Quantity:</p>
                            <div className="flex items-center space-x-2">
                                <button
                                    disabled={countQuantity <= 1}
                                    onClick={decreaseCount}
                                    className="px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-l btn btn-sm rounded-none">
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={countQuantity}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        if (!isNaN(value) && value >= 1) {
                                            setCountQuantity(value);
                                        } else if (e.target.value === '') {
                                            setCountQuantity(0);
                                        }
                                    }}
                                    className="input-sm w-12 text-center py-2 bg-gray-100 border border-gray-300" />
                                <button
                                    disabled={countQuantity >= stock}
                                    onClick={increaseCount}
                                    className="px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-r btn btn-sm rounded-none">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 mt-5">
                        <button onClick={() => handleAddCart(_id)} className="btn bg-blue-500 text-white rounded-none">Add To Cart</button>
                        <button onClick={() => handlePurchase(_id, countQuantity)} className="btn bg-blue-500 text-white rounded-none">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;