import  { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {

  const [formStatus, setFormStatus] = useState('');
const taglineRef = useRef(null); // ✅ define the ref

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (taglineRef.current) { // ✅ check if element exists
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
      );
    } else {
      console.warn("taglineRef not found");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      setFormStatus('Thank you! Your message has been sent.');
      e.target.reset();
    } else {
      setFormStatus('Oops! Something went wrong.');
    }
  };

  return (
    <div className="px-6 py-12 mx-auto max-w-7xl bg-green-50">
      {/* <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-extrabold text-green-950">
          Welcome to <span className="font-serif">Sakshi Hi-tech</span> Nursery
        </h1>
        <p ref={taglineRef} className="text-lg text-gray-700">
          We're happy to help you! Reach out via the form or visit us.
        </p>
      </div> */}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Contact Info */}
        <div className="p-6 shadow-lg bg-green-50 rounded-2xl">
          <h2 className="mb-4 text-2xl font-bold text-green-900"  ref={taglineRef}>Contact Information</h2>
          <p className="mb-2"><strong>Address:</strong> Palkhed(Mi), Shirvade Road, In front of RTC cold Storage, Niphad-Nashik, Maharashtra, India</p>
          <p className="mb-2"><strong>Phone:</strong> +91 7972456090</p>
          <p className="mb-2"><strong>Email:</strong> sakshihitechnursery2271@gmail.com</p>

          <div className="mt-4">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.244582241394!2d74.0598752!3d20.1939651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddd1f97e80d729%3A0x23656d93b25fb63a!2sSakshi%20Hi-Tech%20Nursery!5e0!3m2!1sen!2sin!4v1718532912345!5m2!1sen!2sin"
              width="100%"
              height="250"
              className="border rounded-lg"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          
        </div>

        {/* Contact Form */}
        <form
          className="p-6 shadow-lg rounded-2xl bg-green-50"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4 text-2xl font-bold text-green-900">Contact Form</h2>

          {/* Access Key */}
          <input type="hidden" name="access_key" value="c98bd2b2-3a47-439c-815c-e645d0f43cb4" />

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              required
              rows="4"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Your message..."
            ></textarea>
          </div>

          {formStatus && (
            <p className="mb-4 font-medium text-green-700">{formStatus}</p>
          )}

          <button
            type="submit"
            className="px-6 py-2 text-white transition bg-green-900 rounded-lg hover:bg-green-800"
          >
            Send Message
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default ContactUs;
