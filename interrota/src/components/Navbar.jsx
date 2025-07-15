import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
  };

  return (
    <nav
      className="
        w-full fixed top-0 left-0 z-50
        bg-white/80 backdrop-blur-md
        border-b border-[#27A614]/20
        shadow-lg
        px-6 py-3
        flex justify-between items-center
        font-sfpro
        text-[#0A7307]
      "
      style={{ fontFamily: "'SF Pro Text', 'San Francisco', system-ui, sans-serif" }}
    >
      {/* Perfil à esquerda */}
      <Link
        to="/profile"
        className="
          text-2xl cursor-pointer
          hover:opacity-80 hover:brightness-110
          transition duration-300
        "
        aria-label="Perfil"
      >
        👤
      </Link>

      {/* Logo ao centro */}
      <Link to="/" className="flex items-center justify-center">
        <img src="/images/logo.png" alt="InterRota Logo" className="h-10 w-auto" />
      </Link>

      {/* Configurações à direita */}
      <div className="relative">
        <button
          onClick={() => setShowLangMenu((prev) => !prev)}
          className="
            text-2xl cursor-pointer
            hover:opacity-80 hover:brightness-110
            transition duration-300
            focus:outline-none focus:ring-2 focus:ring-[#27A614]
            rounded-md
          "
          aria-haspopup="true"
          aria-expanded={showLangMenu}
          aria-label="Configurações"
        >
          ⚙️
        </button>

        {showLangMenu && (
          <div
            className="
              absolute right-0 mt-2
              bg-white/50 backdrop-blur-sm
              rounded-xl
              shadow-lg
              p-2
              z-50
              text-sm
              w-36
              border border-[#27A614]/30
            "
            role="menu"
            aria-label="Menu de idiomas"
          >
            <button
              onClick={() => changeLanguage("pt")}
              className="
                block w-full text-left px-4 py-2
                rounded-lg
                hover:bg-[#27A614]/30
                transition duration-300
                focus:outline-none focus:bg-[#27A614]/50
              "
              role="menuitem"
            >
              🇵🇹 Português
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className="
                block w-full text-left px-4 py-2
                rounded-lg
                hover:bg-[#27A614]/30
                transition duration-300
                focus:outline-none focus:bg-[#27A614]/50
              "
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
