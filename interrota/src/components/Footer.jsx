import React from "react";

const Footer = () => {
  return (
    <footer
      className="w-full bg-[#125907]/95 backdrop-blur-[11px] 
                 border-t border-white/10 text-white py-8 px-6 
                 "
      style={{ fontFamily: "'San Francisco Pro', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo e descrição */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          {/* <img
            src="/images/logo.png"
            alt="InterRota Logo"
            className="w-20 h-auto"
            loading="lazy"
          /> */}
          <p className="text-sm text-white/80 max-w-sm text-center md:text-left">
            Transporte seguro, confortável e confiável para explorar Moçambique.
          </p>
        </div>

        {/* Links principais
        <nav className="flex flex-col sm:flex-row gap-6 text-sm font-medium">
          <a
            href="/"
            className="hover:text-[#0A7307] transition-colors"
            aria-label="Página Inicial"
          >
            Início
          </a>
          <a
            href="/ticket"
            className="hover:text-[#0A7307] transition-colors"
            aria-label="Comprar Bilhete"
          >
            Comprar Bilhete
          </a>
          <a
            href="/history"
            className="hover:text-[#0A7307] transition-colors"
            aria-label="Histórico"
          >
            Histórico
          </a>
          <a
            href="/contact"
            className="hover:text-[#0A7307] transition-colors"
            aria-label="Contato"
          >
            Contato
          </a>
        </nav> */}

        {/* Contato e redes sociais */}
        <div className="flex flex-col items-center md:items-end space-y-2 text-sm">
          <p>
            Mais informações:{" "}
            <a
              href="tel:+258846248290"
              className=" hover:text-[#0A7307]"
            >
              (+258) 84 624 8290
            </a>
             
            <a
              href="tel:+258846248290"
              className=" hover:text-[#0A7307] ml-1.5"
            >
              / 87 383 5760
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:Facilnampula@gmail.com"
              className="underline hover:text-[#0A7307]"
            >
              Facilnampula@gmail.com
            </a>
          </p>
          <div className="flex gap-4 mt-1">
            {/* Ícones SVG minimalistas */}
            <a
              href="https://facebook.com/interrota"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0A7307]"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.466h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/interrota"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0A7307]"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 002-2.48 9.05 9.05 0 01-2.88 1.1A4.52 4.52 0 0016.62 2a4.48 4.48 0 00-4.4 5.5A12.83 12.83 0 013 4.15a4.5 4.5 0 001.4 6.02 4.38 4.38 0 01-2.04-.56v.05a4.48 4.48 0 003.6 4.4 4.52 4.52 0 01-2.03.08 4.48 4.48 0 004.2 3.12 9 9 0 01-5.56 1.92A8.62 8.62 0 012 19.57 12.77 12.77 0 008.29 21c7.55 0 11.68-6.25 11.68-11.66 0-.18 0-.36-.01-.54A8.3 8.3 0 0023 3z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/interrota"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0A7307]"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 3a1 1 0 110 2 1 1 0 010-2zm-5 3a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/20 pt-4 text-center text-xs text-white/60 select-none">
        &copy; {new Date().getFullYear()} +Facil. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
