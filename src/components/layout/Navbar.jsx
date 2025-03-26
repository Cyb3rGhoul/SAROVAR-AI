import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Cloud, Beaker, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="px-6 py-4 flex justify-center items-center absolute top-0 left-0 right-0 z-50">
      <div className="bg-white/30 backdrop-blur-md rounded-full px-10 py-3 shadow-lg border border-white/20 flex items-center space-x-8 w-[90%] max-w-6xl">
        <div className="text-2xl font-bold text-[#007acc] mr-6">SAROVAR</div>
        
        <motion.div 
          className="flex-grow flex space-x-6 justify-end"
          initial="hidden"
          animate="visible"
        >
          {[
            { label: "Chatbot", path: "/chat" },
            { label: "About", path: "/about" }
          ].map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="text-[#007acc] relative group"
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="transition-all duration-300"
              >
                {item.label}
              </motion.span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007acc] group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </motion.div>

        {/* User Logo/Icon */}
        <Link 
          to="/" 
          className="text-[#007acc] hover:bg-[#e6f2ff] p-2 rounded-full transition-all duration-300"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <User size={24} />
          </motion.div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;