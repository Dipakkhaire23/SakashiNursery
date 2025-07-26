import {useEffect} from 'react';
import { Sparkles, Sprout, User, Leaf } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const UniqueFeature = () => {
  useEffect(() => {
      AOS.init({
        duration: 800,
        once: true,
      });
    }, []);
  const features = [
    {
      icon: <Sparkles className="h-9 w-9 text-green-600" />,
      title: "Eco-Friendly Practices",
      description:
        "We use sustainable packaging and follow eco-friendly plant sourcing methods to reduce our environmental impact.",
    },
    {
      icon: <Sprout className="h-9 w-9 text-green-600" />,
      title: "Fertilizer & Pesticide Support",
      description:
        "We recommend the right fertilizers and pesticides for each plant and provide them directly for healthy growth.",
    },
    {
      icon: <User className="h-9 w-9 text-green-600" />,
      title: "Expert Guidance",
      description:
        "Our plant care tips and dedicated support ensure that even beginners can grow confidently.",
    },
    {
      icon: <Leaf className="h-9 w-9 text-green-600" />,
      title: "Multiple Varieties Available",
      description:
        "We offer different varieties of the same plant (like multiple types of tomatoes) to suit diverse needs and preferences.",
    },
  ];

  return (
   <div className="bg-green-50 py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
        What Makes Us Unique
      </h2>
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniqueFeature;
