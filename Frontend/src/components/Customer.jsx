import {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import raju from "../images/raju.jpg"
import other from "../images/other.jpg"

// Sample customer data (you can replace with real ones)
const customers = [
  {
    name: "Rajendra Gaikawad",
    logo: raju,
    tagline: "Palkhed(Mi)"
  },
  {
    name: "UrbanGarden Cafe",
    logo: other,
    tagline: "Loves our indoor plants"
  },
  {
    name: "Happy Homes Society",
    logo: "https://static.vecteezy.com/system/resources/previews/038/451/514/non_2x/ai-generated-indian-female-farmer-working-in-her-field-bokeh-style-background-with-generative-ai-photo.jpeg",
    tagline: "Bulk buyer of seasonal plants"
  },
];

const Customer = () => {
   useEffect(() => {
      AOS.init({
        duration: 800,
        once: true,
      });
    }, []);
  return (
    <div className="px-4 py-10 bg-green-50">
      <h2 className="mb-8 text-3xl font-bold text-center text-green-700">
        Our Regular Customers
      </h2>
      <div className="grid max-w-6xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 md:grid-cols-3">
        {customers.map((customer, index) => (
          <div
            key={index}
             data-aos="fade-up"
            data-aos-delay={index * 100}
            className="p-6 text-center transition-shadow duration-300 bg-gray-100 shadow-md rounded-xl hover:shadow-lg"
          >
            <img
              src={customer.logo}
              alt={customer.name}
              className="object-cover w-full h-40 mb-4 rounded"
            />
            <h3 className="text-xl font-semibold text-gray-800">{customer.name}</h3>
            <p className="text-sm text-gray-600">{customer.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
