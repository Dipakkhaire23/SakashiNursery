// src/components/Footer.tsx

import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { FaWhatsapp,FaYoutube  } from 'react-icons/fa'; 


const Footer = () => {
  return (
    <footer className="px-6 py-10 text-gray-300 bg-green-800">
      <div className="grid max-w-6xl grid-cols-1 gap-10 mx-auto md:grid-cols-2">
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
            <p className="font-medium text-white">+91 7972456090</p>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-white" />
            <a href="mailto:sakshihitechnursery2271@gmail.com" className="text-white hover:underline">
              sakshihitechnursery2271@gmail.com
            </a>
            
          </div>
          {/* BY */}
       




        </div>
        

        {/* About and Social */}
        <div>
          <h3 className="mb-2 text-lg font-semibold text-white">About the Nursery</h3>
          <p className="mb-4 text-justify text-white">
            Founded on April 4, 2020, by Prop. Vijay Trambakrao Khaire, Sakshi Hi-tech Nursery started small with a big dream to provide healthy, high-quality plants. With modern techniques and personal care, we now serve customers across states, helping them grow greener spaces.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/sakshihitech.nursery?rdid=Oc7MOegbmk2PshxQ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18gR1X6YSc%2F#"
              className="transition hover:text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook />
            </a>

            <a
              href="https://chat.whatsapp.com/JcfCNVCEuTnCaBpv6ihhJI?fbclid=PAZXh0bgNhZW0CMTEAAac8eV4bBaEzFAZnDZLJQZqM0vwD3sNIhCaejJwiwZyxXiPNDT8VeI_59-Phmw_aem_gY-4GfH9efKXsl3A6teaTQ"
              className="transition hover:text-green-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={23} />
            </a>

            <a
              href="https://www.instagram.com/sakshi_hitech_nursery08?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="transition hover:text-pink-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </a>
            <a
              href="https://www.youtube.com/@SakshiHi-TechNursery"
              className="transition hover:text-red-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={26} />
            </a>
          </div>
        </div>
      </div>
         {/* <div><p className="text-xs text-white-500">Developed by</p></div> */}
<div className='w-full'>
  {/* <style>
    {`
      @keyframes scroll-right {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }

      .scroll-marquee {
        display: flex;
        white-space: nowrap;
        animation: scroll-right 10s linear infinite;
      }
    `}
  </style> */}

  {/* <div className="w-full py-4 overflow-hidden">
   
  </div> */}

  
</div>
      <div className="mt-10 text-sm text-center text-black">
        &copy; {new Date().getFullYear()} Sakshi Hi-Tech Nursery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
