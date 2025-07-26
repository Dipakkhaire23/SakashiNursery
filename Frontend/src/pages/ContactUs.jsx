import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
  const taglineRef = useRef(null);
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    gsap.fromTo(
      taglineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
    );
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
    <div className="max-w-7xl mx-auto px-6 py-12 bg-green-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-green-950 mb-4">
          Welcome to <span className="font-serif">Sakshi Hi-tech</span> Nursery
        </h1>
        <p ref={taglineRef} className="text-gray-700 text-lg">
          We're happy to help you! Reach out via the form or visit us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-green-50 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-green-900">Contact Information</h2>
          <p className="mb-2"><strong>Address:</strong> Palkhed(Mi), Shirvade Road, In front of RTC cold Storage, Niphad-Nashik, Maharashtra, India</p>
          <p className="mb-2"><strong>Phone:</strong> +91 7972456090</p>
          <p className="mb-2"><strong>Email:</strong> sakshihitechnursery2271@gmail.com</p>

          <div className="mt-4">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.244582241394!2d74.0598752!3d20.1939651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddd1f97e80d729%3A0x23656d93b25fb63a!2sSakshi%20Hi-Tech%20Nursery!5e0!3m2!1sen!2sin!4v1718532912345!5m2!1sen!2sin"
              width="100%"
              height="250"
              className="rounded-lg border"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <form
          className="p-6 rounded-2xl shadow-lg bg-green-50"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4 text-green-900">Contact Form</h2>

          {/* Access Key */}
          <input type="hidden" name="access_key" value="c98bd2b2-3a47-439c-815c-e645d0f43cb4" />

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              required
              rows="4"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Your message..."
            ></textarea>
          </div>

          {formStatus && (
            <p className="text-green-700 font-medium mb-4">{formStatus}</p>
          )}

          <button
            type="submit"
            className="bg-green-900 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
