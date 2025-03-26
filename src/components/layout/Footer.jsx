import React from 'react';
import { Beaker } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#f0f9ff] py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <Beaker className="h-8 w-8 text-[#0ea5e9]" />
          <span className="text-xl font-bold text-[#0369a1] font-['Orbitron']">
            SAROVAR
          </span>
        </div>
        <div className="text-[#0284c7] text-sm text-center md:text-right font-['Inter']">
          © {new Date().getFullYear()} SAROVAR. All Rights Reserved.
        </div>
        <div className="flex space-x-4">
          {[
            { name: 'Privacy', link: '/privacy' },
            { name: 'Terms', link: '/terms' },
            { name: 'Contact', link: '/contact' }
          ].map(({ name, link }) => (
            <a 
              key={name}
              href={link} 
              className="text-[#0ea5e9] hover:text-[#0369a1] transition duration-300 font-['Inter']"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;