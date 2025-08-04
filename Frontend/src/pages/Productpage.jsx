import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { LoaderCircle } from "lucide-react";
import 'aos/dist/aos.css';
import aryman  from "../images/aryaman.jpg"
import chilli  from "../images/chilli.jpg"
// import watermeloan  from "../images/watermeloan.jpg"
import marigold  from "../images/marigold.png"
import Cauliflower from "../images/Cauliflower.jpg"
import Papaya from "../images/pappya.jpg"
import Brinjal from "../images/brinjal.jpg"
import veer  from "../images/Slidebar_4.jpg"
import GourdBottle   from "../images/bhopala.jpg"
import karle   from "../images/karle.png"
import shimala   from "../images/shimala.jpg"
import tarbuj   from "../images/tarbuj.jpg"
import kharbuj   from "../images/kharbuj.jpg"
import kakdi   from "../images/kakdi.jpg"
import smallkakdi   from "../images/samllkakdi.jpg"
import shevga   from "../images/shevga.jpg"

const crops = [
  { name: 'Cauliflower',  price: '1.00', images: [Cauliflower] },
  { name: 'Papaya',  price: '15.00', images: [Papaya] },
  { name: 'Brinjal',  price: '1.00', images: [Brinjal] },
  // { name: 'Lady Finger', price: '2.00', images: ['/images/ladyfinger1.jpg'] },  // Bendi
  { name: 'Cabbage',  price: '0.90', images: [veer] },
  { name: 'Bottle Gourd', price: '7.00', images: [GourdBottle] },
  { name: 'Bitter Gourd',  price: '1.00', images: [karle] },
  { name: 'Tomato',  price: '1.50', images: [aryman] },
  { name: 'Chilli',  price: '1.50', images: [chilli] },
  { name: 'Capsicum',  price: '2.50', images: [shimala] },
  { name: 'Watermelon',  price: '2.80', images: [tarbuj] },
  { name: 'Muskmelon',  price: '2.00', images: [kharbuj] },
  { name: 'Cucumber',  price: '2.00', images: [kakdi] },
  { name: 'Small Cucumber',  price: '2.00', images: [smallkakdi] },
  { name: 'Drumstick',  price: '1.50', images: [shevga] },
  { name: 'Merigold',  price: '3.50', images: [marigold] },
];

const ProductPage = () => {
  const navigate = useNavigate();
  const [availableCategories, setAvailableCategories] = useState([]);
  const [isloading,setisloading]=useState(false);

 useEffect(() => {
  setisloading(true);

  fetch(import.meta.env.VITE_BACKEND_URL + '/api/customer/products/getcategoryName', {
    method: 'GET',
    credentials: 'include', // ✅ Correct usage
  })
    .then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then((data) => setAvailableCategories(data))
    .catch((err) => {
      console.error('Failed to load categories', err);
    })
    .finally(() => {
      setisloading(false);
    });
}, []);



  const filteredCrops = crops.filter((crop) =>
    availableCategories.includes(crop.name)
  );

  return (
    <div className="p-4 bg-green-100">
      <h2 className="mb-6 text-2xl font-bold text-center text-green-600">Available Category Now </h2>
       {isloading ? (
        <div className="flex items-center justify-center py-10">
          <LoaderCircle className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-3 text-gray-600">Loading Category...</span>
        </div>
      ) :(

       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {filteredCrops.map((crop, index) => (
    <div
      key={index}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      onClick={() => navigate(`/vegetable/${crop.name.toLowerCase().replace(/\s+/g, '-')}`)}
      className="p-4 m-4 transition-shadow duration-300 border border-orange-200 rounded-md shadow-sm cursor-pointer hover:shadow-md"
    >
      <h3 className="mb-2 text-lg font-semibold text-center text-green-700">{crop.name}</h3>
      <div className="flex flex-wrap gap-2">
        {crop.images.map((img, idx) => (
          <img key={idx} src={img} alt={crop.name} className="object-cover w-full h-40 rounded" />
        ))}
      </div>
    <p className="text-sm font-bold text-center"><strong>Price: ₹</strong> {crop.price}</p>

    </div>
  ))}
</div>

      )}
      
    </div>
  );
};

export default ProductPage;
