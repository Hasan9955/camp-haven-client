import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Response } from "./ProductDetails";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useUpdateProductMutation } from "../redux/features/product/productApi";


const UpdateProduct = () => {

    const [updateProduct] = useUpdateProductMutation();

    const navigate = useNavigate();
    const res = useLoaderData() as Response
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
    const { _id, name, description, photo, price, category, quantity, brand } = data.data;


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleForm = async (e: any) => {

        e.preventDefault()

        const form = e.target
        const name = form.name.value
        const price = form.price.value
        const quantity = parseInt(form.quantity.value)
        const description = form.description.value
        const photo = form.photo.value
        const brand = form.brand.value
        const category = form.category.value



        const productInfo = { name, price, category, quantity, description, photo, brand }
        const product = {
            id: _id,
            data: productInfo
        }
        try {
            const res = await updateProduct(product).unwrap() 
            if (res.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Product updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/productManagement')
            }
        } catch (error) {
            console.log(error);
            toast.error('An error is going on!')
        }
    }

    return (
        <div>
            <div className="flex justify-center">

                <form onSubmit={handleForm} className="border border-blue-500 w-full lg:w-3/4 md:mx-4 mx-2 p-5 my-10 rounded-lg">
                    <h2 className="text-3xl font-bold text-black text-center">Update Product</h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        <div data-aos="fade-right" className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Name</span>
                            </label>
                            <input type="text" name="name"
                                defaultValue={name}
                                className="input input-bordered" required />
                        </div>
                        <div data-aos="fade-left" className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Price</span>
                            </label>
                            <input type="number" name="price" defaultValue={price} className="input input-bordered" required />
                        </div>
                        <div data-aos="fade-right" className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Stock</span>
                            </label>
                            <input type="number" name="quantity" defaultValue={quantity} className="input input-bordered" required />
                        </div>
                        <div data-aos="fade-right" className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Photo</span>
                            </label>
                            <input type="text" name="photo"
                                defaultValue={photo}
                                className="input input-bordered" required />
                        </div>
                        <div data-aos="fade-right" className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Brand</span>
                            </label>
                            <input type="text" name="brand" defaultValue={brand} className="input input-bordered" required />
                        </div>
                        <div data-aos="fade-right" className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Category</span>
                            </label>
                            <input type="text" name="category" defaultValue={category} className="input input-bordered" required />
                        </div>

                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Description</span>
                        </label>
                        <textarea name="description" defaultValue={description} className="textarea textarea-bordered  w-full " required ></textarea>
                    </div>
                    <input className="btn bg-blue-500 text-white w-full mt-4" type="submit" value="Update Product" />
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;