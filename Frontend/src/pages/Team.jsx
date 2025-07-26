import {useEffect} from 'react';
import ownerImg from '../images/owner.jpg';
import worker1 from '../images/worker1.jpg';
import worker2 from '../images/worker2.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';


const founder = {
  name: 'Prop. Vijay Trambakrao Khaire',
  role: 'Founder & Owner',
  image: ownerImg,
  description:
    'With a strong passion for plants and innovation, he started Sakshi Hi-tech Nursery in 2020 with a vision to offer quality and trust to every customer.',
};

const teamMembers = [
  {
    role: 'Plant Care Specialist',
    image: worker1,
    description: 'Ensures the plants are healthy and well-maintained throughout the day.',
  },
  {
    role: 'Packaging & Dispatch',
    image: worker2,
    description: 'Responsible for safe packaging and timely dispatch of plant orders.',
  },
];

const Team = () => {
   useEffect(() => {
      AOS.init({
        duration: 800,
        once: true,
      });
    }, []);
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-10">Our Team</h1>

      {/* Founder Card Centered */}
      <div className="flex justify-center mb-12">
        <div
          data-aos="fade-up"
           
        className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300 max-w-sm">
          <img
            src={founder.image}
            alt={founder.name}
            className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-green-700"
          />
          <h3 className="text-xl font-semibold text-green-700">{founder.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{founder.role}</p>
          <p className="text-gray-600 text-sm">{founder.description}</p>
        </div>
      </div>

      {/* Horizontal Worker Cards */}
      <div className="flex flex-wrap justify-center gap-3">
        {teamMembers.map((member, index) => (
          <div
            key={index}
             data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-white rounded-lg shadow-lg p-4 text-center w-[550px] hover:shadow-xl transition duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-72 object-cover rounded-md mb-4 border-4 border-green-700"
            />
            <h3 className="text-lg font-semibold text-green-700">{member.role}</h3>
            <p className="text-gray-600 text-sm">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
