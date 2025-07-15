import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [method, setMethod] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handlePayment = () => {
    if (!method) {
      setMessage({ type: 'error', text: t('payment.error') });
      return;
    }

    setMessage({ type: 'success', text: t('payment.success') });

    setTimeout(() => {
      navigate('/payment-success');
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-[80px] px-4 pb-12 bg-white flex justify-center items-start">
      <div
        className="
          w-full max-w-xl bg-white/30 backdrop-blur-md
          text-[#0A7307] rounded-xl shadow-xl p-6
          border border-[#27A614]/30 space-y-4
        "
        style={{ fontFamily: "'SF Pro Text', 'San Francisco', sans-serif" }}
      >
        <h2 className="text-2xl font-bold text-center text-black">
          {t('payment.title')}
        </h2>

        <div className="space-y-4">
          {['Mpesa', 'Emola'].map((option) => (
            <div className="flex items-center gap-3" key={option}>
              <input
                type="radio"
                id={option.toLowerCase()}
                name="method"
                value={option}
                checked={method === option}
                onChange={() => setMethod(option)}
                className="accent-[#0A7307]"
              />
              <label htmlFor={option.toLowerCase()} className="font-medium text-black">
                {t(`payment.${option.toLowerCase()}`)}
              </label>
            </div>
          ))}
        </div>

        {message.text && (
          <div
            className={`p-3 rounded-md text-sm font-medium ${
              message.type === 'error'
                ? 'bg-red-100 text-red-700'
                : 'bg-[#A2D99A] text-[#0A7307]'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-col gap-2 mt-6">
          <button
            onClick={handlePayment}
            className="bg-[#27A614] text-white py-2 rounded-md hover:bg-[#1F8B0F] transition shadow"
          >
            {t('payment.pay')}
          </button>
          <button
            onClick={() => navigate('/ticket-details')}
            className="bg-white/60 text-[#0A7307] py-2 rounded-md hover:bg-white border border-[#27A614]/30 transition"
          >
            {t('payment.back')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
