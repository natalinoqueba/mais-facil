import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: '',
    contact: '',
    address: '',
    familyContact: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    if (
      !profile.name ||
      !/^[89]\d{8}$/.test(profile.contact) ||
      !profile.address ||
      !/^[89]\d{8}$/.test(profile.familyContact)
    ) {
      setMessage({ type: 'error', text: t('profile.error') });
      return;
    }

    setMessage({ type: 'success', text: t('profile.success') });
  };

  return (
    <div className="max-w-lg mx-auto mt-16 bg-white text-gray-800 rounded-lg shadow-lg p-8 space-y-6">
      <h2 className="text-3xl font-semibold text-center text-black">{t('profile.title')}</h2>

      <div>
        <label className="block mb-2 font-semibold text-black">{t('profile.name')}</label>
        <input
          id="name"
          value={profile.name}
          onChange={handleChange}
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A7307]"
          placeholder={t('profile.placeholders.name')}
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-black">{t('profile.contact')}</label>
        <input
          id="contact"
          value={profile.contact}
          onChange={handleChange}
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A7307]"
          placeholder="84xxxxxxx"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-black">{t('profile.address')}</label>
        <input
          id="address"
          value={profile.address}
          onChange={handleChange}
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A7307]"
          placeholder={t('profile.placeholders.address')}
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-black">{t('profile.familyContact')}</label>
        <input
          id="familyContact"
          value={profile.familyContact}
          onChange={handleChange}
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A7307]"
          placeholder="84xxxxxxx"
        />
      </div>

      {/* Mensagem de feedback */}
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

      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={handleSave}
          className="bg-[#0A7307] text-white py-3 rounded-md hover:bg-green-700 transition font-semibold"
        >
          {t('profile.save')}
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 transition font-semibold"
        >
          {t('profile.back')}
        </button>
      </div>
    </div>
  );
};

export default Profile;
