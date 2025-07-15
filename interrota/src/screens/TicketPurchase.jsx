import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const TicketPurchase = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    destination: "",
    date: "",
    quantity: "",
    familyContact: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectCompany = (company) => {
    setForm((prev) => ({ ...prev, company }));
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

    setMessage({ type: "success", text: t("ticket.success") });
    localStorage.setItem("ticket", JSON.stringify(form));
    setTimeout(() => navigate("/ticket-details"), 1000);
  };

  return (
    <div
      className="
        max-w-xl mx-auto mt-[70px] bg-white/30 backdrop-blur-md 
        p-8 space-y-5
      "
      style={{ fontFamily: "'SF Pro Text', 'San Francisco', sans-serif" }}
    >
      <h2 className="text-2xl font-bold text-center select-none">
        {t("ticket.title")}
      </h2>

      {/* Companhia */}
      <div>
        <label className="block mb-2 font-medium">{t("ticket.company")}</label>
        <div className="flex gap-4">
          {["Nagi", "Citlink"].map((comp) => (
            <button
              key={comp}
              type="button"
              onClick={() => handleSelectCompany(comp)}
              className={`flex-1 py-2 rounded-md font-medium transition ${
                form.company === comp
                  ? "bg-[#27A614] text-white shadow-md"
                  : "bg-white/50 text-[#0A7307] hover:bg-white/70 border border-[#27A614]/20"
              }`}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>

      {/* Destino */}
      <div>
        <label className="block mb-1 font-medium">
          {t("ticket.destination")}
        </label>
        <select
          id="destination"
          value={form.destination}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-white/70 text-[#0A7307] focus:outline-none focus:ring-2 focus:ring-[#27A614]"
        >
          <option value="">{t("ticket.placeholders.selectDestination")}</option>
          <option value="Maputo">{t("ticket.options.maputo")}</option>
          <option value="Nampula">{t("ticket.options.nampula")}</option>
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

      {/* Feedback visual */}
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
          className="
            bg-[#27A614] text-white py-2 rounded-md
            hover:bg-[#1F8B0F] transition shadow-md active:scale-95
          "
        >
          {t("ticket.continue")}
        </button>
        <button
          onClick={() => navigate(-1)}
          className="
            bg-white/50 text-[#0A7307] py-2 rounded-md
            hover:bg-white transition border border-[#27A614]/20
          "
        >
          {t("ticket.back")}
        </button>
      </div>
    </div>
  );
};

export default TicketPurchase;
