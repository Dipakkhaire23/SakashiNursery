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
  role: 'Plant Care & Delivery Specialist',
  image: worker1,
  description: 'Responsible for preparing plants for delivery by maintaining them through spraying, drenching, and regular monitoring. Also assists with plant loading for dispatch.',
}
,
 {
  role: 'Sowing and Sorting',
  image: worker2,
  description: 'Responsible for sowing seeds according to orders and sorting plants to ensure they are best prepared for delivery.',
}

];

const Team = () => {
   useEffect(() => {
      AOS.init({
        duration: 800,
        once: true,
      });
    }, []);
  return (
    <div className="max-w-6xl px-4 py-12 mx-auto">
      <h1 className="mb-10 text-3xl font-bold text-center text-green-800">Our Team</h1>

      {/* Founder Card Centered */}
      <div className="flex justify-center mb-12">
        <div
          data-aos="fade-up"
           
        className="max-w-sm p-6 text-center transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
          <img
            src={founder.image}
            alt={founder.name}
            className="object-cover w-32 h-32 mx-auto mb-4 border-4 border-green-700 rounded-full"
          />
          <h3 className="text-xl font-semibold text-green-700">{founder.name}</h3>
          <p className="mb-2 text-sm text-gray-500">{founder.role}</p>
          <p className="text-sm text-gray-600">{founder.description}</p>
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
              className="object-cover w-full mb-4 border-4 border-green-700 rounded-md h-72"
            />
            <h3 className="text-lg font-semibold text-green-700">{member.role}</h3>
            <p className="text-sm text-gray-600">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
