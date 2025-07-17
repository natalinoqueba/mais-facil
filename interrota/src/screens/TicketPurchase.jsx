import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    const savedTicket = localStorage.getItem("ticket");
    const selectedCompany = localStorage.getItem("selectedCompany");

    if (savedTicket) {
      setForm(JSON.parse(savedTicket));
    } else if (selectedCompany) {
      setForm((prev) => ({ ...prev, company: selectedCompany }));
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
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

  return (
    <div
      className="min-h-screen max-w-xl mx-auto mt-[70px] bg-white/30 backdrop-blur-md 
      p-8 space-y-5"
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
          <option value="CBI">CBI</option>
          <option value="Khurula">Khurula</option>
          <option value="CITYLINK">CITYLINK</option>
          <option value="ETRAGO">ETRAGO</option>
          <option value="ESTA NA MODA">ESTA NA MODA</option>
          <option value="NAGI">NAGI</option>
        </select>
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
          <option value="Beira">{t("ticket.options.beira")}</option>
          <option value="Quelimane">{t("ticket.options.quelimane")}</option>
          <option value="Tete">{t("ticket.options.tete")}</option>
          <option value="Pemba">{t("ticket.options.pemba")}</option>
          <option value="Inhambane">{t("ticket.options.inhambane")}</option>
          <option value="Xai-Xai">{t("ticket.options.xaiXai")}</option>
          <option value="Chimoio">{t("ticket.options.chimoio")}</option>
          <option value="Lichinga">{t("ticket.options.lichinga")}</option>
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
          className="bg-[#27A614] text-white py-2 rounded-md hover:bg-[#1F8B0F] transition shadow-md active:scale-95"
        >
          {t("ticket.continue")}
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-white/50 text-[#0A7307] py-2 rounded-md hover:bg-white transition border border-[#27A614]/20"
        >
          {t("ticket.back")}
        </button>
      </div>
    </div>
  );
};

export default TicketPurchase;
