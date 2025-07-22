import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import routeData from "../routes.json";

const TicketPurchase = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    company: "",
    destination: "",
    date: "",
    quantity: "1",
    familyContact: "",
    hasDisability: "no",
    disabilityDetails: ""
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const selectedCompany = localStorage.getItem("selectedCompany");

    if (location.state?.fromDetails) {
      const savedTicket = localStorage.getItem("ticket");
      if (savedTicket) {
        setForm(JSON.parse(savedTicket));
        return;
      }
    }

    if (selectedCompany) {
      setForm((prev) => ({ ...prev, company: selectedCompany }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
      ...(id === "company" ? { destination: "" } : {}),
      ...(id === "hasDisability" && value === "no" ? { disabilityDetails: "" } : {})
    }));
  };

  const validate = () => {
    const { company, destination, date, quantity, familyContact } = form;
    return (
      company &&
      destination &&
      date &&
      parseInt(quantity) > 0 &&
      /^[89]\d{8}$/.test(familyContact)
    );
  };

  const handleContinue = () => {
    if (!validate()) {
      setMessage({ type: "error", text: t("ticket.error") });
      return;
    }

    localStorage.setItem("ticket", JSON.stringify(form));
    setMessage({ type: "success", text: t("ticket.success") });
    setTimeout(() => navigate("/ticket-details"), 1000);
  };

  const destinations =
    form.company && routeData[form.company]
      ? Object.entries(routeData[form.company])
      : [];

  const unitPrice = form.destination
    ? routeData[form.company]?.[form.destination] || 0
    : 0;

  const total = unitPrice * (parseInt(form.quantity) || 0);

  return (
    <div
      className="min-h-screen max-w-xl mx-auto mt-[70px] bg-white/30 backdrop-blur-md p-8 space-y-5"
      style={{ fontFamily: "'SF Pro Text', 'San Francisco', sans-serif" }}
    >
      <h2 className="text-2xl font-bold text-center select-none">
        {t("ticket.title")}
      </h2>

      {/* Companhia */}
      <div>
        <label htmlFor="company" className="block mb-1 font-medium">
          {t("ticket.company")}
        </label>
        <select
          id="company"
          value={form.company}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-white/70 text-[#0A7307] focus:outline-none focus:ring-2 focus:ring-[#27A614]"
        >
          <option value="">{t("ticket.placeholders.selectCompany")}</option>
          {Object.keys(routeData).map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      {/* Local de partida */}
      <div>
        <label htmlFor="departure" className="block mb-1 font-medium">
          {t("ticket.departure")}
        </label>
        <select
          id="departure"
          value="Nampula"
          disabled
          className="w-full p-3 border rounded-md bg-gray-100 text-[#0A7307] cursor-not-allowed"
        >
          <option value="Nampula">Nampula</option>
        </select>
      </div>

      {/* Destino */}
      <div>
        <label htmlFor="destination" className="block mb-1 font-medium">
          {t("ticket.destination")}
        </label>
        <select
          id="destination"
          value={form.destination}
          onChange={handleChange}
          disabled={!form.company}
          className="w-full p-3 border rounded-md bg-white/70 text-[#0A7307] focus:outline-none focus:ring-2 focus:ring-[#27A614] disabled:opacity-50"
        >
          <option value="">{t("ticket.placeholders.selectDestination")}</option>
          {destinations.map(([dest]) => (
            <option key={dest} value={dest}>
              {dest}
            </option>
          ))}
        </select>
      </div>

      {/* Data */}
      <div>
        <label className="block mb-1 font-medium">{t("ticket.date")}</label>
        <input
          id="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-white/70 text-[#0A7307] focus:outline-none focus:ring-2 focus:ring-[#27A614]"
        />
      </div>

      {/* Quantidade */}
      <div>
        <label className="block mb-1 font-medium">{t("ticket.quantity")}</label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={form.quantity}
          onChange={handleChange}
          placeholder={t("ticket.placeholders.quantity")}
          className="w-full p-3 border rounded-md bg-white/70 text-[#0A7307] focus:outline-none focus:ring-2 focus:ring-[#27A614]"
        />
      </div>

      {/* Número familiar */}
      <div>
        <label className="block mb-1 font-medium">
          {t("ticket.familyContact")}
        </label>
        <input
          id="familyContact"
          type="text"
          value={form.familyContact}
          onChange={handleChange}
          placeholder="84xxxxxxx"
          className="w-full p-3 border rounded-md bg-white/70 text-[#0A7307] focus:outline-none focus:ring-2 focus:ring-[#27A614]"
        />
      </div>

      {/* Deficiência */}
      <div>
        <label htmlFor="hasDisability" className="block mb-1 font-medium">
         {t("ticket.hasDisability")}
        </label>
        <select
          id="hasDisability"
          value={form.hasDisability}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-white/70 text-[#0A7307] focus:outline-none focus:ring-2 focus:ring-[#27A614]"
        >
          <option value="no">{t("ticket.nohas")}</option>
          <option value="yes">{t("ticket.yeashas")}</option>
        </select>
      </div>

      {form.hasDisability === "yes" && (
        <div>
          <label htmlFor="disabilityDetails" className="block mb-1 font-medium">
            {t("ticket.disabilityDetails")}
          </label>
          <input
            id="disabilityDetails"
            type="text"
            value={form.disabilityDetails}
            onChange={handleChange}
            placeholder= {t("ticket.placeholders.disabilityDetails")}
            className="w-full p-3 border rounded-md bg-white/70 text-[#0A7307] focus:outline-none focus:ring-2 focus:ring-[#27A614]"
          />
        </div>
      )}

      {/* Preço */}
      {form.destination && (
        <div className="text-sm text-[#0A7307] font-medium space-y-1">
          {form.quantity && (
            <div>
              {t("ticket.totalPrice")}: <span className="font-bold">{total} MT</span>
            </div>
          )}
        </div>
      )}

      {/* Mensagem */}
      {message.text && (
        <div
          className={`p-3 rounded-md text-sm font-medium ${
            message.type === "error"
              ? "bg-[#FF3B30]/10 text-[#FF3B30]"
              : "bg-[#A2D99A]/30 text-[#0A7307]"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Ações */}
      <div className="flex flex-col gap-3 mt-4">
        <button
          onClick={handleContinue}
          className="bg-[#27A614] text-white py-2 rounded-md hover:bg-[#1F8B0F] transition shadow-md active:scale-95"
        >
          {t("ticket.continue")}
        </button>
        <button
          onClick={() => navigate("/companies")}
          className="bg-white/50 text-[#0A7307] py-2 rounded-md hover:bg-white transition border border-[#27A614]/20"
        >
          {t("ticket.back")}
        </button>
      </div>
    </div>
  );
};

export default TicketPurchase;
