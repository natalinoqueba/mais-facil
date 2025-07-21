import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validatePassword = (p) => p.length > 0;

  const handleLogin = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = t("login.errors.name");
    if (!validatePassword(form.password))
      newErrors.password = t("login.errors.password");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage({ type: "", text: "" });
      return;
    }

    const userData = {
      name: form.name,
      password: form.password,
      address: "",
      familyContact: "",
    };

    localStorage.setItem("userProfile", JSON.stringify(userData));
    localStorage.setItem("loggedIn", "true");

    setMessage({ type: "success", text: t("login.success") });
    setTimeout(() => navigate("/mainmenu"), 1000);
  };

  return (
    <div
      className="
        min-h-11/12 mt-16
        bg-white/30 backdrop-blur-md
        rounded
        p-6 space-y-6 mb-32
        font-sfpro
        text-gray-900
      "
      style={{
        fontFamily: "'SF Pro Text', 'San Francisco', system-ui, sans-serif",
      }}
    >
      <h2 className="text-2xl font-bold text-center text-[#0A7307]">
        {t("login.title")}
      </h2>

      {/* Nome */}
      <div>
        <label htmlFor="name" className="block mb-1 font-semibold">
          {t("login.name")}
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder={t("login.placeholders.name")}
          className={`w-full p-4 bg-white/80 border rounded-xl text-gray-800 text-base focus:outline-none focus:ring-2 transition ${
            errors.name ? "border-red-500" : "border-[#27A614]"
          }`}
          autoComplete="off"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1"> {errors.name}</p>
        )}
      </div>

      {/* Senha */}
      <div>
        <label htmlFor="password" className="block mb-1 font-semibold">
          {t("login.password")}
        </label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder={t("login.placeholders.password")}
          className={`w-full p-4 bg-white/80 border rounded-xl text-gray-800 text-base focus:outline-none focus:ring-2 transition ${
            errors.password ? "border-red-500" : "border-[#27A614]"
          }`}
          autoComplete="new-password"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1"> {errors.password}</p>
        )}
      </div>

      {/* Mensagem final */}
      {message.text && (
        <div
          role="alert"
          className={`p-3 rounded-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-700 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex flex-col gap-4 mt-6">
        <button
          onClick={handleLogin}
          className="
            text-white
            py-3 rounded-xl
            hover:bg-[#1b4b05]
            transition
            font-medium
            shadow-md
            active:scale-95
            duration-300
          "
          style={{ backgroundColor: "#0A7307" }}
        >
          {t("login.continue")}
        </button>
        <button
          onClick={() => navigate(-1)}
          className="
            bg-[#F5F5F5]
            text-gray-800
            py-3 rounded-xl
            hover:bg-[#e0e0e0]
            transition
            font-medium
          "
        >
          {t("login.back")}
        </button>
      </div>
    </div>
  );
};

export default Login;