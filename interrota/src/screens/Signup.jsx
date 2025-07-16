import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    contact: "",
    address: "",
    familyContact: "",
    location: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const validateContact = (c) => /^[89]\d{8}$/.test(c);

  const handleSignup = () => {
    const { name, contact, address, familyContact } = form;

    if (
      !name ||
      !validateContact(contact) ||
      !address ||
      !validateContact(familyContact)
    ) {
      setMessage({ type: "error", text: t("signup.error") });
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(form));
    localStorage.setItem("loggedIn", "true");

    setMessage({ type: "success", text: t("signup.success") });
    setTimeout(() => navigate("/mainmenu"), 1000);
  };

  return (
    <div className="min-h-screen pt-[95px] px-4 pb-12 bg-white text-black font-sfpro">
      <div className="max-w-lg mx-auto bg-white  p-6 space-y-5">
        <h2 className="text-2xl font-bold text-center">{t("signup.title")}</h2>

        {/* Campo Nome */}
        <div>
          <label className="block mb-1 font-medium">{t("signup.name")}</label>
          <input
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t("signup.placeholders.name")}
            className="w-full p-3 border rounded-md text-black"
          />
        </div>

        {/* Campo Contacto */}
        <div>
          <label className="block mb-1 font-medium">{t("signup.contact")}</label>
          <input
            id="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder={t("signup.placeholders.contact")}
            className="w-full p-3 border rounded-md text-black"
          />
        </div>

        {/* Campo Morada */}
        <div>
          <label className="block mb-1 font-medium">{t("signup.address")}</label>
          <input
            id="address"
            value={form.address}
            onChange={handleChange}
            placeholder={t("signup.placeholders.address")}
            className="w-full p-3 border rounded-md text-black"
          />
        </div>

        {/* Campo Contacto Familiar */}
        <div>
          <label className="block mb-1 font-medium">{t("signup.familyContact")}</label>
          <input
            id="familyContact"
            value={form.familyContact}
            onChange={handleChange}
            placeholder={t("signup.placeholders.familyContact")}
            className="w-full p-3 border rounded-md text-black"
          />
        </div>

        {/* Localização */}
        <div>
          <label className="block mb-1 font-medium">{t("signup.location")}</label>
          <select
            id="location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-white text-black"
          >
            <option value="">{t("signup.placeholders.selectLocation")}</option>
            <option value="Muahivire">{t("signup.options.muahivire")}</option>
            <option value="Namikopo">{t("signup.options.namikopo")}</option>
          </select>
        </div>

        {/* Mensagem de Feedback */}
        {message.text && (
          <div
            className={`p-3 rounded-md text-sm font-medium ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Botões */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={handleSignup}
            className="bg-[#0A7307] text-white py-2 rounded-md hover:bg-[#27A614] transition"
          >
            {t("signup.continue")}
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 text-black py-2 rounded-md hover:bg-gray-300 transition"
          >
            {t("signup.back")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
