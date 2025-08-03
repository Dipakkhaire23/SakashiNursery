import {useEffect} from 'react';
import Award1 from "../images/Award1.jpg";
import Award2 from "../images/award2.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AwardCard = () => {
  const awards = [
    {
      img: Award1,
      title: "Dr. Panjabrao Deshmukh Krishi Gaurav Award",
      desc: "Honored with the Dr. Panjabrao Deshmukh Krishi Gaurav Award by Aamchi Maati Aamchi Mansa."
    },
    {
      img: Award2,
      title: "Dr. Panjabrao Deshmukh Krishi Gaurav Award",
      desc: "Honored with the Dr. Panjabrao Deshmukh Krishi Gaurav Award by Aamchi Maati Aamchi Mansa."
    }
  ];
    useEffect(() => {
        AOS.init({
          duration: 800,
          once: true,
        });
      }, []);

  return (
    <div className="py-8 bg-green-50">
      <h1 className="mb-8 text-3xl font-bold text-center text-green-700">
        Awards & Recognition 2024
      </h1>
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        {awards.map((award, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="max-w-sm p-4 overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl"
          >
            <img
              src={award.img}
              alt={`Award ${index + 1}`}
              className="object-cover w-full mb-4 h-60 rounded-xl"
            />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-green-700">{award.title}</h2>
              <p className="mt-2 text-gray-600">{award.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardCard;
