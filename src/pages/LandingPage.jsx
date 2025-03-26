import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Cloud, Beaker } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      <Navbar/>

      {/* Main Content */}
      <div className="flex-grow flex items-center px-24 relative overflow-hidden">
        <div className="w-1/2 pr-12 z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-[#003366] mb-6"
          >
            S.A.R.O.V.A.R
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#007acc] mb-8"
          >
            About Sarovar and other things
          </motion.p>

          {/* Feature Icons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex space-x-4 mb-8"
          >
            {[
              { Icon: Droplet, label: "Water Prediction" },
              { Icon: Cloud, label: "Rain Forecasting" },
              { Icon: Beaker, label: "Conservation Insights" }
            ].map(({ Icon, label }, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#e6f2ff] rounded-full flex items-center justify-center">
                  <Icon size={32} className="text-[#0077be]" />
                </div>
                <span className="mt-2 text-sm text-[#005c99]">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link 
              to="/chat"
              className="inline-block bg-[#0088cc] hover:bg-[#005c99] text-white font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Start Smart Water Management
            </Link>
          </motion.div>
        </div>

        {/* Chatbot UI Image with Overflow */}
        <motion.div 
          initial={{ x: "10%" }}
          animate={{ x: "20%" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[80%] overflow-hidden"
        >
          <div className="bg-[#f0f8ff] rounded-lg p-6 shadow-xl">
            <div className="bg-white border border-gray-200 rounded-lg p-4 h-96">
              <p className="text-center text-gray-500">Image of the UI of the chatbot page</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      title: "Water Level Monitoring",
      description: "Real-time tracking of water levels in reservoirs and lakes with AI-powered predictions"
    },
    {
      title: "Rainfall Forecasting",
      description: "Accurate rainfall predictions to help plan water usage and conservation"
    },
    {
      title: "Usage Analytics",
      description: "Detailed insights into water consumption patterns and optimization opportunities"
    },
    {
      title: "Flood Prevention",
      description: "Early warning systems for potential flooding based on weather and water data"
    }
  ];

  return (
    <div className="bg-white py-16 px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#003366] text-center mb-12">
          What We Do
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#f8fbfe] rounded-xl p-6 shadow-md border border-[#e6f2ff]"
            >
              <h3 className="text-xl font-semibold text-[#005c99] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#007acc]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <LandingPage />
      <FeatureSection />
    </>
  );
};

export default App;