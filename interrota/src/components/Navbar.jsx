import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const { i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  // const { isAuthenticated } = useAuth();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
  };
  // if (!isAuthenticated) return null; // 👈 Esconde navbar se não estiver logado

  return (
    <nav
      className="
        w-full fixed top-0 left-0 z-50
        bg-white/60 backdrop-blur-md
        border-b border-[#27A614]/20
        shadow-lg
        px-6 py-3
        flex justify-between items-center
        font-sfpro
        text-[#0A7307]
      "
      style={{
        fontFamily: "'SF Pro Text', 'San Francisco', system-ui, sans-serif",
      }}
    >
      {/* Avatar à esquerda */}
      <Link
        to="/profile"
        className="hover:opacity-80 transition duration-300"
        aria-label="Perfil"
      >
        <img
          src="/images/profile.png"
          alt="Perfil"
          className="h-8 w-8 rounded-full object-cover"
        />
      </Link>

      {/* Logo ao centro */}
      <Link to="/" className="flex items-center justify-center">
        <img
          src="/images/logo.png"
          alt="InterRota Logo"
          className="h-10 w-auto"
        />
      </Link>

      {/* Ícone de configurações à direita */}
      <div className="relative">
        <button
          onClick={() => setShowLangMenu((prev) => !prev)}
          className="focus:outline-none rounded-md hover:opacity-80 transition duration-300"
          aria-haspopup="true"
          aria-expanded={showLangMenu}
          aria-label="Configurações"
        >
          <img
            src="/images/settings.png"
            alt="Configurações"
            className="h-9 w-9"
          />
        </button>

        {showLangMenu && (
          <div
            className="
              absolute right-0 mt-2
              bg-white/90 backdrop-blur-sm
              rounded-xl shadow-lg p-2 z-50 text-sm w-36
              border border-[#27A614]/30
            "
            role="menu"
            aria-label="Menu de idiomas"
          >
            <button
              onClick={() => changeLanguage("pt")}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-[#27A614]/30 transition duration-300"
              role="menuitem"
            >
              🇵🇹 Português
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-[#27A614]/30 transition duration-300"
              role="menuitem"
            >
              🇬🇧 English
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
