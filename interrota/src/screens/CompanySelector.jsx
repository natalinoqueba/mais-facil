import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const companies = [
  {
    name: "CBI",
    image: "/images/btn-cbi.jpg",
  },
  {
    name: "Khurula",
    image: "/images/btn-kurula.jpeg",
  },
  {
    name: "CITYLINK",
    image: "/images/btn-city.png",
  },
  {
    name: "ETRAGO",
    image: "/images/btn-etrago.png",
  },
  {
    name: "ESTA NA MODA",
    image: "/images/esta-na-moda.jpg",
  },
  {
    name: "NAGI",
    image: "/images/btn-nagi.jpg",
  },
];

const CompanySelector = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelect = (company) => {
    localStorage.setItem("selectedCompany", company.name);
    navigate("/ticket");
  };

  return (
    <div className="min-h-screen pt-[95px] px-4 pb-12 bg-white text-black font-sfpro">
      <div className="max-w-5xl mx-auto text-center">
        <div className=" pt-[1px] px- pb-5 bg-white ">
          <h2 className="text-3xl font-bold text-[#0A7307] mb-8">
            {t("company.title")}
          </h2>
          {/* <p>
              Escolha a sua companhia de viagem preferida com a +Facil e comece a
              planejar a sua próxima aventura por Moçambique! Selecione uma das
              opções abaixo e compre sua passagem com rapidez e segurança.
            </p> */}
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">     */}
        <div className=" grid grid-cols-2 md:grid-cols-3 gap-6">
          {companies.map((company, i) => (
            <div
              key={i}
              onClick={() => handleSelect(company)}
              className="
                cursor-pointer bg-white border border-[#27A614]/40 rounded-xl shadow-xl
                hover:shadow-lg hover:scale-[1.02] transition-all duration-300
                flex flex-col items-center min-
              "
            >
              <img
                src={company.image}
                alt={company.name}
                className="w-40 h-40 mb-4"
              />
              {/* <h3 className="text-lg font-semibold text-[#0A7307]">
                {company.name}
              </h3> */}
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/mainmenu")}
          className="
            mt-6 px-6 py-3 bg-gray-200 text-gray-800 rounded-md
            hover:bg-gray-300 transition font-medium
          "
        >
          {t("ticket.back")}
        </button>
      </div>
    </div>
  );
};

export default CompanySelector;
