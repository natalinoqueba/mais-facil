import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const slides = [
  "/images/fundo-1.jpg",
  "/images/fundo-3.jpg",
  "/images/fundo-4.jpg",
];

const Home = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides de fundo */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${slide})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Overlay com efeito Glass */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xxs">
        <div className="bg-white/20 backdrop-blur-lg px-10 py-8 rounded-2xl text-center shadow-xl max-w-md w-9/12">
          <h2 className="text-3xl font-bold text-white mb-3">
            {t("home.welcome")}
          </h2>
          <p className="text-white mb-6">{t("home.description")}</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <button className="w-full sm:w-auto bg-[#27A614] text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
                {t("home.login")}
              </button>
            </Link>
            <Link to="/signup">
              <button className="w-full sm:w-auto bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-[#27A614] transition">
                {t("home.signup")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
