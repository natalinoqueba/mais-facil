import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const MyTickets = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("tickets");
    if (stored) {
      setTickets(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen pt-[95px] pb-12 px-4 bg-white text-[#0A7307] font-sfpro">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">{t("myTickets.title")}</h2>

        {tickets.length === 0 ? (
          <p className="text-center text-gray-500">{t("myTickets.none")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 shadow-xl border border-[#27A614]/30
                           bg-white/30 backdrop-blur-md text-[#0A7307] transition hover:scale-[1.02]"
              >
                <h3 className="text-lg font-bold">{ticket.destination}</h3>
                <p className="text-sm mt-1">{t("myTickets.company")}: {ticket.company}</p>
                <p className="text-sm">{t("myTickets.date")}: {ticket.date}</p>
                <p className="text-sm">{t("myTickets.quantity")}: {ticket.quantity}</p>
                <p className="text-sm">{t("myTickets.familyContact")}: {ticket.familyContact}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
