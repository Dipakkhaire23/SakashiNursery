// src/components/Footer.tsx

import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { FaWhatsapp,FaYoutube  } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 text-white" />
            <div>
              <p>Palkhed(Mi), Shirvade Road, In front of RTC cold Storage</p>
              <p className="font-semibold text-white">Niphad-Nashik, Maharashtra, India</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-white" />
            <p className="text-white font-medium">+91 7972456090</p>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-white" />
            <a href="mailto:sakshihitechnursery2271@gmail.com" className="text-white hover:underline">
              sakshihitechnursery2271@gmail.com
            </a>
          </div>
        </div>

        {/* About and Social */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-2">About the Nursery</h3>
          <p className="text-gray-400 mb-4 text-justify">
            Founded on April 4, 2020, by Prop. Vijay Trambakrao Khaire, Sakshi Hi-tech Nursery started small with a big dream to provide healthy, high-quality plants. With modern techniques and personal care, we now serve customers across states, helping them grow greener spaces.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/sakshihitech.nursery?rdid=Oc7MOegbmk2PshxQ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18gR1X6YSc%2F#"
              className="hover:text-blue-500 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook />
            </a>

            <a
              href="https://chat.whatsapp.com/JcfCNVCEuTnCaBpv6ihhJI?fbclid=PAZXh0bgNhZW0CMTEAAac8eV4bBaEzFAZnDZLJQZqM0vwD3sNIhCaejJwiwZyxXiPNDT8VeI_59-Phmw_aem_gY-4GfH9efKXsl3A6teaTQ"
              className="hover:text-green-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={23} />
            </a>

            <a
              href="https://www.instagram.com/sakshi_hitech_nursery08?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="hover:text-pink-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </a>
            <a
              href="https://www.youtube.com/@SakshiHi-TechNursery"
              className="hover:text-red-500 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={26} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10">
        &copy; {new Date().getFullYear()} Sakshi Hi-Tech Nursery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
