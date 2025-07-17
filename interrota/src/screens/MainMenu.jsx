import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// No TourCard, ajuste a imagem e container para manter aspect ratio 1:1 (quadrado)

const TourCard = ({ image, alt, title, location }) => {
  const navigate = useNavigate();

  return (
    <div
      className="
          bg-white/20 backdrop-blur-md rounded-xl shadow-lg cursor-pointer overflow-hidden
          transition-transform duration-300 hover:scale-105 hover:shadow-2xl
          border border-[#27A614]/30
          aspect-square   // força o card ser quadrado
          flex flex-col
        "
      onClick={() => navigate("/ticket")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate("/ticket");
      }}
      aria-label={`Ver detalhes do tour: ${title}`}
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-0 flex-grow object-cover" // ajusta para ocupar espaço e manter proporção
        style={{ flexBasis: 0 }}
      />
      <div className="bg-white/50 backdrop-blur-sm p-4 text-center rounded-b-xl">
        <h4 className="text-lg font-semibold text-[#0A7307]">{title}</h4>
        <p className="text-sm text-[#27A614] mt-1.5">{location}</p>
      </div>
    </div>
  );
};

const MainMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tourPoints = [
    {
      image: "/images/ilha.jpg",
      alt: "Ilha de Moçambique",
      title: "Ilha de Moçambique",
      location: "Nampula",
    },
    {
      image: "/images/gorongosa.jpg",
      alt: "Parque da Gorongosa",
      title: "Parque da Gorongosa",
      location: "Sofala",
    },
    {
      image: "/images/tofo.jpg",
      alt: "Praia do Tofo",
      title: "Praia do Tofo",
      location: "Inhambane",
    },
    {
      image: "/images/cahora.webp",
      alt: "Barragem de Cahora Bassa",
      title: "Barragem de Cahora Bassa",
      location: "Tete",
    },
  ];

  return (
    <div
      className="
      min-h-screen px-4 pb-12 pt-[95px] 
      bg-white text-[#0A7307] font-sfpro
    "
      style={{
        fontFamily: "'SF Pro Text', 'San Francisco', system-ui, sans-serif",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Menu principal */}
        <div
          className="
              bg-white/30 backdrop-blur-md
              rounded-2xl shadow-2xl
              text-center p-8
              border border-[#27A614]/30
            "
        >
          <h2 className="text-3xl font-bold text-[#0A7307] mb-6 select-none">
            +Facil
          </h2>
          <p className="text-lg  text-gray-800 mb-6">
            Descubra a beleza e a riqueza cultural de Moçambique com a +Facil!
            Explore destinos incríveis, compre passagens com facilidade e
            planeje sua próxima aventura com segurança e praticidade.
          </p>
          <div className="space-y-4 max-w-sm mx-auto">
            <button
              onClick={() => navigate("/companies")}
              className="
                  w-full py-3 px-4
                  bg-[#27A614]
                  text-white
                  rounded-xl
                  hover:bg-[#1F8B0F]
                  transition
                  font-medium
                  shadow-md
                  active:scale-95
                  duration-300
                "
            >
              {t("menu.buyTicket")}
            </button>

            <button
              onClick={() => navigate("/mytickets")}
              className="
                  w-full py-3 px-4
                  bg-[#27A614]
                  text-white
                  rounded-xl
                  hover:bg-[#1F8B0F]
                  transition
                  font-medium
                  shadow-md
                  active:scale-95
                  duration-300
                "
            >
              {t("menu.history")}
            </button>
          </div>
        </div>

        {/* Seção de turismo */}
        <h3 className="text-2xl text-center mt-12 mb-6 text-[#0A7307] font-semibold select-none">
          {t("menu.exploreMoz")}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tourPoints.map((tour, i) => (
            <TourCard
              key={i}
              image={tour.image}
              alt={tour.alt}
              title={tour.title}
              location={tour.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
