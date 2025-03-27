import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="px-4 py-4 flex justify-center items-center fixed top-0 left-0 right-0 z-50">
      <div className="bg-white/30 backdrop-blur-md rounded-full px-4 sm:px-6 md:px-10 py-2 sm:py-3 shadow-lg border border-white/20 flex items-center justify-between w-[95%] sm:w-[90%] max-w-6xl">
        {/* Logo */}
        <Link to="/" className="text-xl sm:text-2xl font-bold text-[#007acc] font-[Merriweather]">
          <Link to="/">S.A.R.O.V.A.R</Link>
        </Link>
        
        {/* Navigation Links */}
        <motion.div 
          className="hidden sm:flex space-x-4 md:space-x-6 items-center"
          initial="hidden"
          animate="visible"
        >
          {[
            { label: "Chatbot", path: "/chat" }
            // { label: "About", path: "/about" }
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
        
        {/* Mobile Menu Dropdown (TODO) */}
        <div className="sm:hidden">
          {/* Placeholder for mobile menu toggle */}
        </div>

        {/* User Authentication */}
        <div className="flex items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-[#007acc] hover:bg-[#e6f2ff] p-2 rounded-full transition-all duration-300"
              >
                <User size={24} />
              </motion.button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;