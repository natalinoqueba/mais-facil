import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import routeData from "../routes.json";

const TicketDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("ticket");
    if (saved) {
      setTicket(JSON.parse(saved));
    }
  }, []);

  const handleProceed = () => {
    if (!ticket) return;

    const unitPrice = routeData[ticket.company]?.[ticket.destination] || 0;
    const totalPrice = unitPrice * (parseInt(ticket.quantity) || 0);
    const ticketNumber = ticket.ticketNumber || Math.floor(Math.random() * 900000000 + 100000000);

    const fullTicket = {
      ...ticket,
      departure: "Nampula",
      unitPrice,
      totalPrice,
      ticketNumber,
      createdAt: new Date().toISOString(),
    };

    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push(fullTicket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
    localStorage.setItem("ticket", JSON.stringify(fullTicket));

    navigate("/payment");
  };

  if (!ticket) {
    return (
      <div className="text-center mt-20 text-[#0A7307]">
        <p className="text-lg font-medium">{t("ticketDetails.noTicket")}</p>
        <button
          className="mt-4 px-4 py-2 rounded-md bg-[#27A614] text-white hover:bg-[#1F8B0F] transition font-medium shadow"
          onClick={() => navigate("/ticket")}
        >
          {t("ticketDetails.back")}
        </button>
      </div>
    );
  }

  const unitPrice = routeData[ticket.company]?.[ticket.destination] || 0;
  const totalPrice = unitPrice * (parseInt(ticket.quantity) || 0);

  return (
    <div
      className="max-w-xl mx-auto mt-20 min-h-screen bg-white/30 backdrop-blur-md text-[#0A7307] p-6"
      style={{ fontFamily: "'SF Pro Text', 'San Francisco', sans-serif" }}
    >
      <h2 className="text-2xl font-bold text-center text-black select-none">
        {t("ticketDetails.title")}
      </h2>

      <ul className="space-y-2 text-left text-[#0A7307]">
        <li><strong className="text-black">{t("ticketDetails.familyContact")}:</strong> {ticket.familyContact}</li>
        <li><strong className="text-black">{t("ticketDetails.company")}:</strong> {ticket.company}</li>
        <li><strong className="text-black">{t("ticketDetails.destination")}:</strong> {ticket.destination}</li>
        <li><strong className="text-black">{t("ticketDetails.date")}:</strong> {ticket.date}</li>
        <li><strong className="text-black">{t("ticketDetails.quantity")}:</strong> {ticket.quantity}</li>
        {ticket.hasDisability === "yes" && (
          <li>
            <strong className="text-black">{t("ticketDetails.disability")}:</strong> {ticket.disabilityDetails}
          </li>
        )}
        <li><strong className="text-black">{t("ticketDetails.unitPrice")}:</strong> {unitPrice} MT</li>
        <li><strong className="text-black">{t("ticketDetails.totalPrice")}:</strong> {totalPrice} MT</li>
      </ul>

      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={handleProceed}
          className="bg-[#27A614] text-white py-2 rounded-md hover:bg-[#1F8B0F] transition shadow-md active:scale-95"
        >
          {t("ticketDetails.proceed")}
        </button>
        <button
          onClick={() => navigate("/ticket", { state: { fromDetails: true } })}
          className="bg-white/50 text-[#0A7307] py-2 rounded-md hover:bg-white transition border border-[#27A614]/20"
        >
          {t("ticketDetails.edit")}
        </button>
      </div>
    </div>
  );
};

export default TicketDetails;
