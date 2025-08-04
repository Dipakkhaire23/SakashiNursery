import{ useState, useEffect } from 'react';
// import { Toaster, toast } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import chilli  from "../images/chilli.jpg"
import aryman  from "../images/aryaman.jpg"
import veer  from "../images/Slidebar_4.jpg"
import watermeloan  from "../images/watermeloan.jpg"
import { useNavigate } from "react-router-dom";

const products = [
  {
  id: 1,
  name: 'veer-333',
  price: '₹1.0',
  category: 'Cabbage',
  description: `कॅबेज वीर-333 ही एक उच्च उत्पादनक्षम संकरित जात आहे. ही वाण गोलसर, घट्ट आणि सम प्रमाणात वाढणाऱ्या गाठींसाठी ओळखली जाते. कमी कालावधीत कापणीस तयार होते आणि बाजारात विक्रीसाठी उत्तम आहे.

वैशिष्ट्ये:

- जलद वाढ – रोप लावल्यानंतर 60-65 दिवसात कापणीस तयार
- गाठींचे वजन – सरासरी 1.5 ते 2.5 किलो
- आकर्षक रंग – गडद हिरवट आणि गुळगुळीत पाने
- रोग प्रतिकार – ब्लॅक रॉट व टॉप बर्नसारख्या आजारांपासून संरक्षण
- बाजारात टिकाव – वाहतूक व विक्रीसाठी चांगली सहनशीलता

लागवडीचा योग्य कालावधी:
ऑक्टोबर ते डिसेंबर हा कालावधी लागवडीसाठी सर्वोत्तम आहे.

शेतकरी मित्रांनो, जर तुम्हाला कमी वेळात चांगला उत्पादन व बाजारभाव हवा असेल, तर कॅबेज वीर-333 हे उत्तम निवड आहे! 🌱💚`,
  wiki: 'https://en.wikipedia.org/wiki/Cabbage',
  image: veer,
},

{
  id: 2,
  name: 'Armar',
  price: '₹1.50',
  category: 'Chilli',
  description: `Armar मिरची ही उच्च प्रतीची संकरित जात आहे. या जातीच्या मिरच्या मध्यम लांब, गडद हिरव्या आणि आकर्षक रंगाच्या असतात. चव तिखट आणि उत्पादन चांगले मिळते. बाजारात विक्रीसाठी तसेच सुकवण्यासाठी योग्य.

वैशिष्ट्ये:

- मिरचीची लांबी: 10-12 सेमी
- गडद हिरवा रंग व आकर्षक चमक
- उत्तम तिखटपणा
- पीक कालावधी: 70-80 दिवसांत कापणीस योग्य
`,
  wiki: 'https://en.wikipedia.org/wiki/chilli',
  image: chilli,
}
,
  {
    id: 3,
    name: 'Bahubali',
    price: '₹2.90',
    
    category: 'Watermelon',
    description: `बाहुबली ही वॉटरमेलनची एक उच्च उत्पादनक्षम वाण आहे, जी मोठ्या आकाराच्या, गडद हिरव्या रंगाच्या गाठींसाठी प्रसिद्ध आहे. गोडसर चव, आकर्षक रंग आणि वजनदार फळांमुळे ही वाण बाजारात मोठ्या प्रमाणात पसंत केली जाते.

वैशिष्ट्ये:

जलद वाढ व लवकर कापणी – 70-75 दिवसांत तयार

फळांचे वजन – सरासरी 5 ते 8 किलो पर्यंत

आकर्षक रंग – गडद हिरवी साल व गडद लाल गर

चव – गोडसर व रसदार

बाजारात टिकाव – वाहतुकीसाठी योग्य, मजबूत साल

उत्पादन – प्रति एकर भरपूर उत्पादन क्षमता

लागवडीचा योग्य कालावधी:
जानेवारी ते मार्च आणि जून ते जुलै हे महिने लागवडीसाठी सर्वोत्तम आहेत.`,
    wiki: 'https://en.wikipedia.org/wiki/Watermelon',
    image: watermeloan,
  },
  {
    id: 4,
    name: 'Aryaman',
    price: '₹1.50',
   
    category: 'Tomato',
    description: `आर्यमान हा टोमॅटोचा एक उत्तम संकरित (हायब्रीड) प्रकार आहे जो उच्च उत्पादन, आकर्षक रंग, आणि चांगली टिकवण क्षमता यासाठी ओळखला जातो. बाजारात विक्रीसाठी तसेच वाहतुकीसाठीही ही वाण खूप फायदेशीर आहे.

वैशिष्ट्ये:

जलद वाढ – फळधारणा लवकर सुरू होते

फळांचे वजन – सरासरी 90 ते 120 ग्रॅम

आकर्षक रंग – गडद लालसर, गुळगुळीत त्वचा

आकार – गोलसर आणि थोडा चपट्या प्रकारचा

उत्पादन क्षमता – खूपच चांगले उत्पादन

टिकवण क्षमता – काढणीनंतर दीर्घकाळ टिकतो

रोग प्रतिकार – बुरशीजन्य व विषाणूजन्य रोगांना चांगला प्रतिकार

लागवडीचा योग्य कालावधी:
जुलै ते नोव्हेंबर व डिसेंबर ते फेब्रुवारी या कालावधीत लागवड करणे अधिक फायदेशीर.`,
    wiki: 'https://en.wikipedia.org/wiki/Tomato',
    image:aryman,
  
  },
];

const ProductCard = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  // const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  const isAuthenticated=localStorage.getItem("token")
    const navigate = useNavigate();

  // const handleAddToWishlist = (product) => {
  //   const isWishlisted = wishlist.includes(product.id);
  //   if (isWishlisted) {
  //     setWishlist(wishlist.filter(id => id !== product.id));
  //     toast.error(`${product.name} removed from wishlist`);
  //   } else {
  //     setWishlist([...wishlist, product.id]);
  //     toast.success(`${product.name} added to wishlist`);
  //   }
  // };

  return (
   <div className="p-6 bg-green-50">
  <h2 className="mb-8 text-3xl font-bold text-center text-green-700">
    Top selling Plants
  </h2>

  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
    {products.map((product, index) => (
      <div
        key={product.id}
        data-aos="fade-up"
        data-aos-delay={index * 100}
        className="relative p-4 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg"
      >
        {/* ✅ Image click navigates to login if unauthenticated */}
        <img
          src={product.image}
          alt={product.name}
          onClick={() => {
            const path = `/vegetable/${product.category}`;
            if (!isAuthenticated) {
              localStorage.setItem("redirectAfterLogin", path);
              navigate("/login");
            } else {
              navigate(path);
            }
          }}
          className="object-cover w-full h-40 mb-2 rounded cursor-pointer"
        />

        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-green-700">{product.name}</h3>
          <p className="text-lg font-bold text-green-600">₹{product.price}</p>
        </div>

        {/* ✅ View Details shows modal only if authenticated */}
        <div className="mt-4">
          <button
            onClick={() => {
              // if (!isAuthenticated) {
              //   localStorage.setItem("redirectAfterLogin", `/vegetable/${product.category}`);
              //   navigate("/login");
              // } else {
                
              // }
              setSelectedPlant(product); // Only open modal
            }}
            className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* ✅ Modal */}
  {selectedPlant && (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen overflow-auto bg-white">
      <div className="relative flex flex-col items-center justify-start w-screen h-screen p-6 pt-16">
        <button
          className="absolute text-4xl font-bold text-gray-700 transition-colors top-4 right-6 hover:text-red-600"
          onClick={() => setSelectedPlant(null)}
        >
          ×
        </button>

        <img
          src={selectedPlant.image}
          alt={selectedPlant.name}
          className="object-cover w-11/12 h-64 max-w-xl mb-6 rounded"
        />

        <h2 className="mb-2 text-3xl font-bold text-green-700">{selectedPlant.name}</h2>
        <p className="px-4 mb-2 text-base text-center text-gray-700">{selectedPlant.description}</p>
        <p className="mb-1 text-xl font-semibold text-green-600">Price: ₹{selectedPlant.price}</p>
        <p className="mb-4 text-sm text-gray-600">
          Category: <span className="font-medium">{selectedPlant.category}</span>
        </p>

        <a
          href={selectedPlant.wiki}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 underline hover:text-blue-800"
        >
          View on Wikipedia
        </a>
      </div>
    </div>
  )}
</div>

  );
};

export default ProductCard;
