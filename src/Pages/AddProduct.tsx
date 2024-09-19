/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { useAddProductMutation } from "../redux/features/product/productApi";
import { toast } from "react-toastify";

const AddProduct = () => {
    
    const [addProduct] = useAddProductMutation();

    const handleForm = async (e: any) => {

        e.preventDefault()

        const form = e.target 
        const name = form.name.value 
        const price = form.price.value
        const quantity = parseInt(form.quantity.value)
        const description = form.description.value
        const photo = form.photo.value 
        const brand = form.brand.value 



        const productInfo = { name, price, quantity, description, photo, brand }
        console.log(productInfo)
        

        try {
            const res = await addProduct(productInfo).unwrap()
            console.log(res); 
            if(res.success){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Product added successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            } 
        } catch (error) {
            console.log(error);
            toast.error('An error is going on!')
        }


        /* fetch('https://eater-zone-server.vercel.app/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Product added successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }) */
    }



    return (
        <div>
            <div className="flex justify-center">

                <form onSubmit={handleForm} className="border border-blue-500 w-full lg:w-3/4 md:mx-4 mx-2 p-5 my-10 rounded-lg">
                    <h2 className="text-3xl font-bold text-black text-center">Add New Food</h2>
                    <div className="grid md:grid-cols-2 gap-5"> 
                        <div data-aos="fade-right" className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Enter product name" className="input input-bordered" required />
                        </div> 
                        <div data-aos="fade-left" className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Price</span>
                            </label>
                            <input type="number" name="price" placeholder="Enter price" className="input input-bordered" required />
                        </div>
                        <div data-aos="fade-right" className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Quantity</span>
                            </label>
                            <input type="number" name="quantity" placeholder="Enter product quantity" className="input input-bordered" required />
                        </div>
                        <div data-aos="fade-right" className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Photo</span>
                        </label>
                        <input type="text" name="photo" placeholder="Enter photo URL" className="input input-bordered" required />
                    </div>
                        <div data-aos="fade-right" className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Brand</span>
                        </label>
                        <input type="text" name="brand" placeholder="Enter product brand" className="input input-bordered" required />
                    </div>
                        
                    </div>
                    
                    <div data-aos="fade-left" className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Description</span>
                            </label>
                            <textarea name="description" placeholder="Enter description" className="textarea textarea-bordered  w-full " required ></textarea>
                        </div>
                    <input className="btn bg-blue-500 text-white w-full mt-4" type="submit" value="Add Food" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;