import { Link } from "react-router-dom";
import { TProduct } from "../interface/product.interface";

type TProductProps = {
    product: TProduct
}
const ProductCard = ({ product }: TProductProps) => {
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img className="w-full rounded-lg" src={product.photo} alt="productIMG" /></figure>
            <div className="card-body gr">
                <h2 className="card-title">{product.name}</h2>
                <p className=" font-bold">Brand: {product.brand}</p>
                <p className="text-lg text-blue-600 font-bold">Price: ${product.price}</p>
                <Link to={`/productDetails/${product._id}`}><button className="btn btn-outline btn-sm border p-2 rounded-full border-blue-500 hover:text-white hover:bg-black hover:border-black">Show Details</button></Link>
            </div>
        </div>
    );
};

export default ProductCard;