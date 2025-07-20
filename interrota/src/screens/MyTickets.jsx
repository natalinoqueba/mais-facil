import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const MyTickets = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("tickets");
    if (stored) {
      setTickets(JSON.parse(stored));
    }
  }, []);

  const handleDownload = (ticket) => {
    const doc = new jsPDF();
    const formattedDate = new Date(ticket.createdAt).toLocaleString("pt-BR");

    // Logo
    const logo = new Image();
    logo.src = `${window.location.origin}/images/logo.png`;

    logo.onload = () => {
      doc.addImage(logo, "PNG", 80, 10, 50, 20);

      doc.setFontSize(14);
      doc.setTextColor("#0A7307");
      doc.text(`Passagem - ${ticket.company}`, 20, 40);
      doc.setDrawColor(0);
      doc.line(20, 43, 190, 43);

      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`Bilhete Nº: ${ticket.ticketNumber}`, 20, 50);
      doc.text(`Data de Emissão: ${formattedDate}`, 20, 58);
      doc.line(20, 62, 190, 62);

      doc.text(`Partida: ${ticket.departure}`, 20, 70);
      doc.text(`Destino: ${ticket.destination}`, 20, 78);
      doc.text(`Data da Viagem: ${ticket.date}`, 20, 86);
      doc.text(`Quantidade: ${ticket.quantity}`, 20, 94);
      doc.text(`Número Familiar: ${ticket.familyContact}`, 20, 102);
      doc.line(20, 106, 190, 106);

      doc.text(`Preço Unitário: MZN ${ticket.unitPrice}`, 20, 114);
      doc.text(`Valor Total: MZN ${ticket.totalPrice}`, 20, 122);
      doc.line(20, 126, 190, 126);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Suporte: (+258) 84 123 4567 | www.maisfacil.com", 20, 134);

      doc.save(`bilhete-${ticket.ticketNumber}.pdf`);
    };
  };

  return (
    <div className="min-h-screen pt-[95px] pb-12 px-4 bg-white text-[#0A7307] font-sfpro">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          {t("myTickets.title")}
        </h2>

        {tickets.length === 0 ? (
          <p className="text-center text-gray-500">{t("myTickets.none")}</p>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 shadow-md border border-[#27A614]/30 bg-white/30 backdrop-blur-md text-[#0A7307]"
              >
                <div>
                  <h3 className="text-lg font-bold">
                    {ticket.destination} ({ticket.company})
                  </h3>
                  <p className="text-sm">
                    {t("myTickets.ticketNumber")}: {ticket.ticketNumber}
                  </p>
                  <p className="text-sm">
                    {t("myTickets.departure")}: {ticket.departure}
                  </p>
                  <p className="text-sm">
                    {t("myTickets.date")}: {ticket.date}
                  </p>
                  <p className="text-sm">
                    {t("myTickets.quantity")}: {ticket.quantity}
                  </p>
                  <p className="text-sm">
                    {t("myTickets.familyContact")}: {ticket.familyContact}
                  </p>
                  <p className="text-sm">
                    {t("myTickets.unitPrice")}: {ticket.unitPrice} MT
                  </p>
                  <p className="text-sm">
                    {t("myTickets.totalPrice")}: {ticket.totalPrice} MT
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(ticket)}
                  className="bg-[#27A614] text-white py-2 px-4 hover:bg-[#1F8B0F] transition shadow-md"
                >
                  {t("myTickets.download")}
                </button>
              </div>
            ))}
          </div>
        )}
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

export default MyTickets;
