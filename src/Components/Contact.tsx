import { FaPhoneVolume } from "react-icons/fa6";
import { FaHeadphones } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Contact = () => {
    return (
        <>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100 p-4 max-w-7xl mx-auto my-20">
    
    
      <div className="flex items-center space-x-3 bg-white p-4 shadow">
        <div className="text-3xl text-black">
          <FaPhoneVolume className="h-8 w-8" />
        </div>
        <div>
          <p className="font-bold md:uppercase">Do you have a question</p>
          <p className="">500-130-120</p>
        </div>
      </div>

     
     
      <div className="flex items-center space-x-3 bg-white p-4 shadow">
        <div className="text-3xl text-black">
          <IoIosMail className="h-8 w-8" />
        </div>
        <div>
          <p className="font-bold md:uppercase">Offer Question</p>
          <p className=" text-gray-600">contact@somedomain.com</p>
        </div>
      </div>

   
   
      <div className="flex items-center space-x-3 bg-white p-4 shadow">
        <div className="text-3xl text-black">
          <FaHeadphones className="h-8 w-8" />
        </div>
        <div>
          <p className="font-bold md:uppercase">Support Question</p>
          <p className=" text-gray-600">support@somedomain.com</p>
        </div>
      </div>
    </div>
        </>

    );
};

export default Contact;