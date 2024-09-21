import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TProduct } from "../interface/product.interface";
import ReactImageMagnify from "react-image-magnify";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAddCartProductMutation } from "../redux/features/cart/cartApi";


type Response = {
    data: {
        data: TProduct;
    };
    isError: boolean;
    isLoading: boolean;
}

const ProductDetails = () => {

    const [countQuantity, setCountQuantity] = useState(1);
    const navigate = useNavigate()
    const user = useAppSelector(selectCurrentUser)
    const [addCartProduct] = useAddCartProductMutation();
    const res = useLoaderData() as Response;
    const { data, isError, isLoading } = res;
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        console.log(isError);
        return <p>An error is going on!!!</p>
    }
    const { _id, name, description, photo, price, quantity, brand } = data.data;


    const handlePurchase = () => {
        if (quantity === 0) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Sorry, but this item is not available right now.",
            });
        }

        navigate(`/`)
    }

    const handleAddCart = async (id: string) => {
        const productData = {
            productId: id,
            userId: user?.userId,
            quantity: countQuantity
        }

        const res = await addCartProduct(productData) 
        if(res.data.success){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Product added successfully",
                showConfirmButton: false,
                timer: 1500
              });
        }


    }


  const increaseCount = () => setCountQuantity(countQuantity + 1);
  const decreaseCount = () => {
    if (countQuantity > 1) {
        return setCountQuantity(countQuantity - 1)
    };
  };

    return (
        <div>
            <div className="flex flex-col md:flex-row bg-base-100 my-10 md:mx-10">
                <figure>
                    <ReactImageMagnify className="w-[400px] lg:w-[600px] h-[230px] md:h-[300px] lg:h-[400px] rounded-xl" {...{
                        smallImage: {
                            alt: 'productIMG',
                            isFluidWidth: true,
                            src: photo
                        },
                        largeImage: {
                            src: photo,
                            width: 1200,
                            height: 1800
                        }
                    }} />
                    {/* <img className="w-[400px] lg:w-[600px] h-[230px] md:h-[300px] lg:h-[400px] rounded-xl" src={photo} alt="productIMG" /> */}
                </figure>
                <div className="p-2 lg:card-body flex flex-col">
                    <div className="space-y-3">
                        <h2 className="card-title mb-2">{name}</h2>
                        <h4 className="max-w-md ">{description}</h4>
                        <h4 className="font-bold ">Brand: {brand}</h4>
                        <h4 className="font-bold ">Availability: {quantity > 0 ? <span className="bg-green-600 p-1 font-semibold text-xs text-white max-w-28">Many In Stock</span> : <p className="bg-red-600 p-1 font-semibold text-xs text-white max-w-28"> Out Of Stock </p>}</h4>
                        <h4 className="font-bold ">Stock: {quantity} items</h4>
                        <h4 className="font-bold text-xl text-blue-600">Price: ${price}</h4>
                        <div className="flex justify-normal items-center max-w-40 gap-5">
                            <p className="font-bold ">Quantity:</p>
                        <div className="flex items-center space-x-2"> 
                            <button
                                onClick={decreaseCount}
                                className="px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-l">
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
                                className="w-12 text-center py-2 bg-gray-100 border border-gray-300"/>
                            <button
                                onClick={increaseCount}
                                className="px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-r">
                                +
                            </button>
                        </div>
                        </div>
                        </div>
                    <div className="flex gap-5 mt-5">
                    <button onClick={() => handleAddCart(_id)} className="btn bg-blue-500 text-white rounded-none">Add To Cart</button>
                    <button onClick={handlePurchase} className="btn bg-blue-500 text-white rounded-none">Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;