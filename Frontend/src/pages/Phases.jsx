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
   <div className="max-w-8xl mx-auto px-8 py-12 mb-7 mt-4">
     <Toaster position="top-center" />
      <h1 className="text-3xl font-bold text-center text-green-800 mb-10">
        Our Service Phases
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {phaseData.map((phase, index) => (
          <Link to={phase.path} key={index}>
            <div
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="w-64 h-26 bg-white rounded-xl shadow-md p-5 border-l-4 border-green-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out flex flex-col justify-between"
            >
              <h2 className="text-lg font-semibold text-green-700 mb-1">{phase.title}</h2>
              <p className="text-gray-700 text-sm text-justify">{phase.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Phases;
