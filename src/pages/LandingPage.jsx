import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Cloud, Beaker } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import chatimg from "../assets/sarovar.png";
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">



      {/* Main Content */}
      <div className="flex-grow flex items-center px-36 relative overflow-hidden">
        <div className="w-1/2 pr-12 z-10 text-left">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-[#003366] mb-6"
          >
            S.A.R.O.V.A.R
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#007acc] mb-8 leading-relaxed"
          >
            An AI-powered platform helping rural communities optimize water usage through predictive analytics and smart irrigation recommendations.
          </motion.p>

          {/* Feature Icons - Left Aligned */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col space-y-6 mb-8 items-start"
          >
            {[
              {
                Icon: Droplet,
                label: "Real-time Water Forecasts",
                description: "AI-driven predictions of water availability based on weather and usage patterns"
              },
              {
                Icon: Cloud,
                label: "Smart Irrigation Plans",
                description: "Personalized watering schedules for maximum crop yield with minimal waste"
              },
              {
                Icon: Beaker,
                label: "Conservation Analytics",
                description: "Data-driven insights for sustainable water management practices"
              }
            ].map(({ Icon, label, description }, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#e6f2ff] rounded-full flex items-center justify-center">
                  <Icon size={16} className="text-[#0077be]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#005c99]">{label}</h3>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col space-y-2"
          >
            <Link
              to="/chat"
              className="inline-block bg-[#0088cc] hover:bg-[#005c99] text-white font-bold py-3 px-8 rounded-full transition duration-300 w-fit"
            >
              Get Water Insights Now
            </Link>
            <p className="text-sm text-gray-500">
              Available in English, Hindi, and Marathi
            </p>
          </motion.div>
        </div>

        {/* Chatbot UI Image with Overflow */}
        <motion.div
          initial={{ x: "10%" }}
          animate={{ x: "20%" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[55%] overflow-hidden"
        >
          <div className="bg-[#f0f8ff] rounded-lg p-6 shadow-xl">
            <div className="bg-white border border-gray-200 rounded-lg p-4 h-96">
              <img src={chatimg} className='h-88'></img>
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
    <div className="bg-white px-24 pb-16">
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
      <Navbar />
      <LandingPage />
      <FeatureSection />
      <Footer />
    </>
  );
};

export default App;