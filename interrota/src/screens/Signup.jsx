import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    contact: '',
    address: '',
    familyContact: '',
    location: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const validateContact = (c) => /^[89]\d{8}$/.test(c);

  const handleSignup = () => {
    const { name, contact, address, familyContact } = form;

    if (!name || !validateContact(contact) || !address || !validateContact(familyContact)) {
      setMessage({ type: 'error', text: t('signup.error') });
      return;
    }

    // Simulação de sucesso
    setMessage({ type: 'success', text: t('signup.success') });
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white text-gray-800 rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-center">{t('signup.title')}</h2>

      <div>
        <label className="block mb-1 font-medium">{t('signup.name')}</label>
        <input
          id="name"
          value={form.name}
          onChange={handleChange}
          placeholder={t('signup.placeholders.name')}
          className="w-full p-3 border rounded-md"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">{t('signup.contact')}</label>
        <input
          id="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder={t('signup.placeholders.contact')}
          className="w-full p-3 border rounded-md"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">{t('signup.address')}</label>
        <input
          id="address"
          value={form.address}
          onChange={handleChange}
          placeholder={t('signup.placeholders.address')}
          className="w-full p-3 border rounded-md"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">{t('signup.familyContact')}</label>
        <input
          id="familyContact"
          value={form.familyContact}
          onChange={handleChange}
          placeholder={t('signup.placeholders.familyContact')}
          className="w-full p-3 border rounded-md"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">{t('signup.location')}</label>
        <select
          id="location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-white"
        >
          <option value="">{t('signup.placeholders.selectLocation')}</option>
          <option value="Muahivire">{t('signup.options.muahivire')}</option>
          <option value="Namikopo">{t('signup.options.namikopo')}</option>
        </select>
      </div>

      {message.text && (
        <div
          className={`p-3 rounded-md text-sm font-medium ${
            message.type === 'error'
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={() => navigate('/mainmenu')}
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {t('signup.continue')}
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
        >
          {t('signup.back')}
        </button>
      </div>
    </div>
  );
};

export default Signup;
