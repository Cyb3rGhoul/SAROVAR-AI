# 🌊 S.A.R.O.V.A.R (Smart AI Resource Optimization for Vital Aquatic Reserves)

*Empowering rural communities with AI-driven water management*

---

## 📌 Overview

SAROVAR is an **AI-powered chatbot platform** designed to help rural communities optimize water usage by analyzing weather patterns, groundwater levels, and crop needs. This project provides real-time insights to farmers and policymakers for sustainable water management.

![SAROVAR Interface Demo](./src/assets/sarovar.png)

---

## ✨ Key Features

- **🌦️ AI-Powered Water Forecasts** - Predicts water availability using ML models  
- **🌱 Smart Irrigation Advice** - Personalized crop-water recommendations  
- **🚨 Proactive Alerts** - Early warnings for droughts/water shortages  
- **🗣️ Multilingual Voice Support** - Hindi, Marathi & English voice interface  
- **📊 Data Integration** - Processes satellite, IoT sensor & government water data  

---

## 🛠️ Tech Stack


**Frontend:**  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)  
![Lucide React](https://img.shields.io/badge/Lucide_React-000000?style=for-the-badge&logo=lucide&logoColor=white)  

**Backend:**  
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)  

**AI/ML:**  
![Gemini API](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)  


## 🚀 Installation

### Prerequisites
- Node.js v18+
- Google Gemini API key
- Clerk publishable key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sarovar.git
   cd sarovar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create `.env` file in root:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_key
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

4. **Run the application**
   ```bash
   npm run dev  # Start the application
   ```

---

## 🖥️ Usage Guide

1. **Access the Chatbot**  
   Open `http://localhost:3000` in your browser

2. **Key Interactions**:
   - 💬 Ask about water availability: *"When will the next rainfall occur?"*
   - 🌾 Get crop advice: *"Best crops for current soil moisture?"*
   - 🚰 Report issues: *"There's a water leak in my village"*

3. **Voice Commands**  
   Click the 🎤 icon and speak in Hindi/Marathi/English

---

## 📂 Project Structure

```
sarovar/                  # Root project folder
├── public/               # Static assets
├── src/                  # Source code
│   ├── assets/           # Images, icons, etc.
│   ├── components/       # Reusable components
│   │   ├── ChatPage/
│   │   ├── layout/
│   │   ├── PreLoader/
│   ├── contexts/         # Context API
│   │   ├── LanguageContext.jsx
│   ├── pages/            # Page components
│   │   ├── AboutPage.jsx
│   │   ├── ChatPage.jsx
│   │   ├── LandingPage.jsx
│   ├── routes/           # Routing files
│   │   ├── AppRoutes.jsx
│   │   ├── ClerkProvider.jsx
│   ├── utils/            # Utility functions
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .env                  # Environment variables
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── README.md

```

---

## 🤝 How to Contribute

1. Fork the repository  
2. Create a new branch (`git checkout -b feature/your-feature`)  
3. Commit changes (`git commit -m 'Add some feature'`)  
4. Push to branch (`git push origin feature/your-feature`)  
5. Open a Pull Request  

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.


---

> "Water is the driving force of all nature." - Leonardo da Vinci  

**Let's build a water-secure future together!** 💧🌍