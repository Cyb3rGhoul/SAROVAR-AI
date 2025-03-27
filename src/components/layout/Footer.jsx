import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#f0f9ff] to-[#e6f2ff] py-12 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Logo and Branding Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center space-x-3">
              {/* <Beaker className="h-10 w-10 text-[#0369a1]" /> */}
              <span className="text-2xl font-bold text-[#0369a1] tracking-wider font-[Merriweather]">
                S.A.R.O.V.A.R.
              </span>
            </div>
            <p className="text-[#0284c7] text-sm text-center md:text-left font-['Inter'] max-w-xs">
              Innovative solutions driving technology forward with passion and precision.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-lg text-[#0369a1] font-semibold mb-4 font-[Merriweather]">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-3 text-center">
              {[
                { name: 'Privacy Policy', link: '/' },
                { name: 'Terms of Service', link: '/' },
                { name: 'Contact Us', link: '/' }
              ].map(({ name, link }) => (
                <a 
                  key={name}
                  href={link} 
                  className="text-[#0ea5e9] hover:text-[#0369a1] transition duration-300 font-['Inter'] hover:underline"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-lg text-[#0369a1] font-semibold mb-4 font-[Merriweather]">
              Contact Info
            </h4>
            <div className="flex flex-col space-y-3 text-[#0284c7] font-['Inter']">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Bhopal, Madhya Pradesh, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>harshshukla.work@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+919344116227</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-6 border-t border-[#0ea5e9]/20 text-center">
          <p className="text-sm text-[#0284c7] font-[Merriweather]">
            © {new Date().getFullYear()} SAROVAR. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;