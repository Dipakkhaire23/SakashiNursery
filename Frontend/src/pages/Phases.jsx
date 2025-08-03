import { Link } from "react-router-dom";

import  { useEffect } from "react";

import { Toaster } from "react-hot-toast";
import AOS from 'aos';
import 'aos/dist/aos.css';


const phaseData = [
  {
    title: "Booking Phase",
    description: "Customers book the plant of their choice...",
    path: "/phases/booking",
  },
  {
    title: "Sowing Phase",
    description: "Seeds are sown in seedling trays...",
    path: "/phases/sowing",
  },
  {
    title: "Plant Preparing Phase",
    description: "Seedlings are grown in controlled environments...",
    path: "/phases/preparing",
  },
  {
    title: "Customer Visit Phase",
    description: "Customers visit the nursery...",
    path: "/phases/visit",
  },
  {
    title: "Delivered Plant Phase",
    description: "Fully grown plants are delivered...",
    path: "/phases/delivered",
  },
];

const Phases = () => {
 
  // useEffect(() => {
  //  generatetoken();
  //  onMessage(messaging,(payload)=>{
  //   console.log(payload.notification)
  //    toast.success(payload.notification.body)

  //  })

   
  // }, []);


   useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);



  return (
   <div className="px-8 py-12 mx-auto mt-4 max-w-8xl mb-7 ">
     <Toaster position="top-center" />
      <h1 className="mb-10 text-3xl font-bold text-center text-green-800">
        Our Service Phases
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {phaseData.map((phase, index) => (
          <Link to={phase.path} key={index}>
            <div
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="flex flex-col justify-between w-64 p-5 transition-all duration-300 ease-in-out bg-white border-l-4 border-green-600 shadow-md h-26 rounded-xl hover:shadow-2xl hover:scale-105"
            >
              <h2 className="mb-1 text-lg font-semibold text-green-700">{phase.title}</h2>
              <p className="text-sm text-justify text-gray-700">{phase.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Phases;
