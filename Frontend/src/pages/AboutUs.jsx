import { useEffect, useRef } from "react";
import ownerImg from "../images/aboutusimage.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Team from "./Team";
import dipak  from "../images/dipak.jpg"
import atharv  from "../images/atharv.jpg"
import ashwini  from "../images/ashwini.jpg"

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const taglineRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
     window.scrollTo(0, 0);
    // Tagline animation
    gsap.fromTo(
      taglineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
    );

    // Core Value cards animation on scroll
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 font-sans bg-green-50 md:px-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="mb-4 text-4xl font-extrabold text-green-900">
          Welcome to <span className="font-serif">Sakshi Hi-Tech</span> Nursery
        </h1>
        <p ref={taglineRef} className="mb-8 text-lg text-gray-700">
          Carefully Grown. Beautifully Delivered.
        </p>
      </div>

      {/* Founder Section */}
      <section className="max-w-5xl mx-auto my-12 text-center">
        <img
  src={ownerImg}
  alt="Founder Mr. Vijay Trambakrao Khaire"
  className="object-cover mx-auto shadow-lg object-top-left w-100 h-95 rounded-xl"
  loading="lazy"
/>

        <h2 className="mt-4 text-xl font-bold text-green-900">Prop. Vijay Trambakrao Khaire</h2>
        <p className="font-medium text-green-700">Founder</p>
      </section>

      {/* Sakshi Section */}
      <section className="gap-10 px-6 mx-auto my-10 text-center max-w-7xl md:text-left md:flex md:items-start">
        <div className="mt-8 md:mt-0">
          <h2 className="mb-4 text-2xl font-bold text-green-900">
            Sakshi Hi-Tech Nursery, Nashik
          </h2>
          <p className="leading-relaxed text-justify text-gray-700">
          Welcome to <strong>Sakshi Hi-tech Nursery</strong>, a place where nature meets care and quality.
          Our journey began on <strong>April 4, 2020</strong>, with a dream to bring the beauty of plants.
          Founded by <strong>Prop. Vijay Trambakrao Khaire</strong>, our nursery started as a small effort to provide
          healthy, beautiful plants to local plant lovers.
          <br /><br />
          In the beginning, like any new venture, we faced many challenges. It wasn’t easy to attract customers or
          meet their expectations. We had to constantly find ways to improve the quality of our plants and build trust
          with our early customers. But we never gave up. With hard work, passion, and belief in our vision, we kept going.
          <br /><br />
          Over time, we adopted the latest technologies and followed proper plant management techniques to ensure the best
          care for every plant we grow. We focused on improving our processes, soil quality, watering systems, and overall
          plant health. These changes helped us serve our customers better and provide them with long-lasting plants.
          <br /><br />
          Slowly but surely, more customers started to notice our work. They appreciated the high-quality plants and the
          dedication behind them. As our customer base grew, so did our reach. What started as a small nursery soon expanded,
          and our plants began reaching customers in other states as well. We built strong connections with customers from
          different places and continued to grow with their support.
          <br /><br />
          Today, <strong>Sakshi Hi-tech Nursery</strong> is known for its top-quality plants and excellent customer service.
          We also guide our customers on how to care for their plants, offering tips, support, and personalized advice.
          Whether you're a beginner or a farmer, we're here to help you.
        </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="px-6 py-16 bg-green-50 md:px-20">
        <div className="mx-auto text-center max-w-8xl">
          <h2 className="mb-12 text-3xl font-extrabold text-green-900">Our Core Values</h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                title: "Quality First",
                description: "Every plant reflects our promise of health, endurance, and beauty.",
                image:
                  "https://america-diy.s3.us-west-1.amazonaws.com/418/conversions/unnamed-%281%29-large.jpg",
              },
              {
                title: "Eco-Conscious",
                description: "We follow sustainable practices to protect our environment.",
                image:
                  "https://s7ap1.scene7.com/is/image/TslDXP/cover_image?fmt=webp",
              },
              {
                title: "Innovation",
                description: "Modern methods ensure smarter, stronger, and faster plant growth.",
                image:
                  "https://img.freepik.com/free-photo/plant-growing-from-soil_23-2151729539.jpg?semt=ais_hybrid&w=740",
              },
              {
                title: "Customer-Centric",
                description: "Guidance, care tips, and personal service for every plant parent.",
                image:
                  "https://thumbs.dreamstime.com/b/young-people-working-greenhouse-attractive-female-agricultural-engineer-communicating-male-worker-holding-fresh-lettuce-115129781.jpg",
              },
              {
                title: "Integrity",
                description: "We believe in honesty, trust, and long-term relationships.",
                image:
                  "https://plus.unsplash.com/premium_photo-1661421746164-b8b53de3bd4e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFuZCUyMHNoYWtlfGVufDB8fDB8fHww",
              },
              {
                title: "Passion for Greenery",
                description: "Our love for nature drives us to go the extra mile, every time.",
                image:
                  "https://img.freepik.com/free-photo/green-field-with-cloudy-morning-sky-with-hills_181624-22466.jpg?semt=ais_hybrid&w=740",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                ref={addToRefs}
                className="overflow-hidden transition bg-white shadow-md rounded-2xl hover:shadow-lg"
              >
                <img
                  src={value.image}
                  alt={value.title}
                  className="object-cover w-full h-40"
                  loading="lazy"
                />
                <div className="p-6">
                  <h4 className="mb-2 text-lg font-bold text-green-800">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Team/>
      <h2 className="flex justify-center font-bold"> Devloped By</h2>
    <div className="flex flex-col justify-center gap-4 px-4 py-2 overflow-x-auto sm:flex-row sm:gap-16 sm:overflow-visible whitespace-nowrap sm:whitespace-normal">
  {/* Member 1 */}
  <div className="flex items-center space-x-4 min-w-max sm:min-w-0">
    <img
      src={dipak}
      alt="Dipak Khaire"
      className="object-cover w-12 h-12 rounded-full"
    />
    <p className="text-sm font-semibold text-black">Dipak Khaire</p>
  </div>

  {/* Member 2 */}
  <div className="flex items-center space-x-4 min-w-max sm:min-w-0">
    <img
      src={ashwini}
      alt="Ashwini Salunke"
      className="object-cover w-12 h-12 rounded-full"
    />
    <p className="text-sm font-semibold text-black">Ashwini Salunke</p>
  </div>

  {/* Member 3 */}
  <div className="flex items-center space-x-4 min-w-max sm:min-w-0">
    <img
      src={atharv}
      alt="Atharv Kamerkar"
      className="object-cover w-12 h-12 rounded-full"
    />
    <p className="text-sm font-semibold text-black">Atharv Kamerkar</p>
  </div>
</div>


    </div>
  );
};

export default AboutUs;
