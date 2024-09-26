import { useNavigate } from "react-router-dom";
import Title from "./Title";



const CategoryProducts = () => {


    const navigate = useNavigate();

    const handleLink = (category: string) => {
        navigate('/shop', {
            state: category
        })
    }

    const categoryArray = [
        {
            photo: "https://i.ibb.co.com/F5dwDNg/img22.webp",
            name: "Tent"
        },
        {
            photo: "https://i.ibb.co.com/3CvzKsX/product-2-large.webp" ,
            name: "Footwear"
        },
        {
            photo: "https://i.ibb.co.com/RDW1Dtb/img16-large.webp" ,
            name: "Accessories"
        },
        {
            photo: "https://i.ibb.co.com/TT3YWdD/img11-large.webp" ,
            name: "Backpacks"
        },
    ]
    return (
        <div>
            <Title title="Product Category" subtitle="Find products by category!" />

            <div className="grid grid-cols-1 md:grid-cols-4 px-2 md:px-8 gap-5">
                {
                    categoryArray.map((prod) => <div key={prod.photo} onClick={() => handleLink('Tent')} className="cursor-pointer hover:text-blue-500 border flex flex-col justify-center items-center my-auto mx-auto shadow-lg  transition-transform transform hover:scale-105">
                        <img className="p-2 border-b-2 object-cover max-w-72 md:max-w-60 border-blue-500" src={prod.photo} alt="" />
                        <p className="text-xl my-4 font-bold ">{prod.name}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default CategoryProducts;