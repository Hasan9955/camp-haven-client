import { Link, useLocation } from "react-router-dom";
import Confetti from 'react-confetti'
import { useWindowSize } from "react-use";
// import useWindowSize from 'react-use/lib/useWindowSize'

const SuccessPage = () => {
    

     
    const {width, height} = useWindowSize();
    const location = useLocation();
    console.log(location);
    const orderData = location.state 

    return (
        <div>
            <Confetti
                width={width}
                height={height}
            />
            <div className="flex flex-col justify-center items-center my-20">
                <img className="w-24 md:w-32" src="https://i.ibb.co/ZT2CFZB/Eo-circle-green-white-checkmark-svg.png" alt="" />
                <p className="text-3xl font-bold">Your order placed successfully!!!</p>
                <div className="flex items-start border-b pb-4 w-full max-w-md mt-10">
                        <img src={orderData.img} alt="productImg" className="w-12 h-12 object-cover rounded-md mr-4" />
                        <div className="flex-1">
                            <h2 className="text-lg font-medium">{orderData.name}</h2>
                            <p className="text-sm text-gray-500">Quantity: {orderData.quantity}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold text-blue-500">${orderData.totalCost}</p>
                        </div>
                    </div>
                <Link to='/shop'><button className="btn bg-blue-500 text-white mt-6">Continuing Shopping...</button></Link>
            </div>
        </div>
    );
};

export default SuccessPage;