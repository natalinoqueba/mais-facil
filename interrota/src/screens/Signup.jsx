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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateContact = (c) => /^[89]\d{8}$/.test(c);

  const handleSignup = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = t("signup.errors.name");
    if (!validateContact(form.contact))
      newErrors.contact = t("signup.errors.contact");
    if (!form.address) newErrors.address = t("signup.errors.address");
    if (!validateContact(form.familyContact))
      newErrors.familyContact = t("signup.errors.familyContact");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(form));
    localStorage.setItem("loggedIn", "true");
    navigate("/mainmenu");
  };

  return (
    <div className="min-h-screen pt-[95px] px-4 pb-12 bg-white text-black font-sfpro">
      <div className="max-w-lg mx-auto bg-white p-6 space-y-5">
        <h2 className="text-2xl font-bold text-center">{t("signup.title")}</h2>

        {/* Nome */}
        <div>
          <label className="block mb-1 font-medium">{t("signup.name")}</label>
          <input
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t("signup.placeholders.name")}
            className={`w-full p-3 border border-[#27A614] rounded-md text-black ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1"> {errors.name}</p>
          )}
        </div>

        {/* Contacto */}
        <div>
          <label className="block mb-1 font-medium">
            {t("signup.contact")}
          </label>
          <input
            id="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder={t("signup.placeholders.contact")}
            className={`w-full p-3 border border-[#27A614] rounded-md text-black ${
              errors.contact ? "border-red-500" : ""
            }`}
          />
          {errors.contact && (
            <p className="text-red-600 text-sm mt-1"> {errors.contact}</p>
          )}
        </div>

        {/* Morada */}
        <div>
          <label className="block mb-1 font-medium">
            {t("signup.address")}
          </label>
          <input
            id="address"
            value={form.address}
            onChange={handleChange}
            placeholder={t("signup.placeholders.address")}
            className={`w-full p-3 border border-[#27A614] rounded-md text-black ${
              errors.address ? "border-red-500" : ""
            }`}
          />
          {errors.address && (
            <p className="text-red-600 text-sm mt-1"> {errors.address}</p>
          )}
        </div>

        {/* Contacto Familiar */}
        <div>
          <label className="block mb-1 font-medium">
            {t("signup.familyContact")}
          </label>
          <input
            id="familyContact"
            value={form.familyContact}
            onChange={handleChange}
            placeholder={t("signup.placeholders.familyContact")}
            className={`w-full p-3 border border-[#27A614] rounded-md text-black ${
              errors.familyContact ? "border-red-500" : ""
            }`}
          />
          {errors.familyContact && (
            <p className="text-red-600 text-sm mt-1"> {errors.familyContact}</p>
          )}
        </div>

        {/* Bairro (Opcional) */}
        <div>
          <label className="block mb-1 font-medium">
            {t("signup.location")}{" "}
          </label>
          <select
            id="location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-3 border border-[#27A614] rounded-md bg-white text-black"
          >
            <option value="">{t("signup.placeholders.selectLocation")}</option>
            <option value="Muahivire">{t("signup.options.muahivire")}</option>
            <option value="Namikopo">{t("signup.options.namikopo")}</option>
          </select>
        </div>

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
