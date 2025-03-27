import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Cloud, Beaker } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../components/layout/Navbar';
import chatimg from "../assets/sarovar.png";
import Footer from '../components/layout/Footer';
import { ClerkProvider } from '@clerk/clerk-react'

// Custom hook for animation triggers
const useScrollAnimation = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return [ref, controls];
};

const LandingPage = () => {
  const [ref, controls] = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden mt-10">
      {/* Main Content */}
      <div className="flex-grow flex flex-col lg:flex-row items-center px-4 sm:px-8 md:px-12 lg:px-24 xl:px-36 relative">
        {/* Text Content */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            },
            hidden: { opacity: 0, x: -20 }
          }}
          className="w-full lg:w-1/2 lg:pr-12 z-10 text-center lg:text-left py-12 lg:py-0"
        >
          <motion.h1
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: -50 }
            }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#003366] mb-4 sm:mb-6"
          >
            S.A.R.O.V.A.R
          </motion.h1>

          <motion.p
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: -50 }
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#007acc] mb-6 sm:mb-8 leading-relaxed"
          >
            (Smart AI Resource Optimization for Vital Aquatic Reserves) <br />
            An AI-powered platform helping rural communities optimize water usage through predictive analytics and smart irrigation recommendations.
          </motion.p>

          {/* Feature Icons */}
          <motion.div
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col space-y-4 sm:space-y-6 mb-8 items-center lg:items-start"
          >
            {[
              {
                Icon: Droplet,
                label: "Real-time Water Forecasts",

              },
              {
                Icon: Cloud,
                label: "Smart Irrigation Plans",

              },
              {
                Icon: Beaker,
                label: "Conservation Analytics",

              }
            ].map(({ Icon, label, description }, index) => (
              <motion.div
                key={index}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 }
                }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-start space-x-3 sm:space-x-4 max-w-md"
              >
                <div className="w-8 h-8 bg-[#e6f2ff] rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#0077be]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-[#005c99]">{label}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: { opacity: 0, scale: 0.9 }
            }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col space-y-2 items-center lg:items-start"
          >
            <Link
              to="/chat"
              className="inline-block bg-[#0088cc] hover:bg-[#005c99] text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full transition duration-300 w-fit transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            >
              Get Water Insights Now
            </Link>
            <p className="text-xs sm:text-sm text-gray-500">
              Available in English, Hindi, and Marathi
            </p>
          </motion.div>
        </motion.div>

        {/* Chatbot UI Image */}
        <motion.div
          initial={{ opacity: 0, x: "10%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-1/2 mt-8 lg:mt-0 relative lg:absolute lg:right-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 px-4 sm:px-8 lg:px-0"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#f0f8ff] rounded-lg p-4 sm:p-6 shadow-xl overflow-hidden"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 h-64 sm:h-80 md:h-96 relative">
              <img
                src={chatimg}
                alt="SAROVAR interface"
                className="h-full w-full object-contain object-center"
                loading="lazy"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      title: "Water Level Monitoring",
      description: "Real-time tracking of water levels in reservoirs and lakes with AI-powered predictions",
      icon: <Droplet className="text-[#0077be]" size={24} />
    },
    {
      title: "Rainfall Forecasting",
      description: "Accurate rainfall predictions to help plan water usage and conservation",
      icon: <Cloud className="text-[#0077be]" size={24} />
    },
    {
      title: "Usage Analytics",
      description: "Detailed insights into water consumption patterns and optimization opportunities",
      icon: <Beaker className="text-[#0077be]" size={24} />
    },
    {
      title: "Flood Prevention",
      description: "Early warning systems for potential flooding based on weather and water data",
      icon: <Droplet className="text-[#0077be]" size={24} />
    }
  ];

  return (
    <div className="bg-white px-4 sm:px-8 md:px-12 lg:px-24 xl:px-36 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#003366] text-center mb-8 sm:mb-12"
        >
          What We Do
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-[#f8fbfe] rounded-xl p-5 sm:p-6 shadow-md border border-[#e6f2ff] hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-[#e6f2ff] rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#005c99] mb-2 sm:mb-3 text-center sm:text-left">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-[#007acc] text-center sm:text-left">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const App = () => {
  return (
    <>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <Navbar />
      </ClerkProvider>
      <LandingPage />
      <FeatureSection />
      <Footer />
    </>
  );
};

export default App;