import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGenerateTicket = () => {
    navigate('/ticket-pdf'); // futuro: rota para visualização ou geração do PDF
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#138005c5] px-4 pt-[0px]">
      <div
        className="w-full max-w-md bg-white/60 backdrop-blur-md border border-[#27A614]/20
                   text-[#0A7307] rounded-2xl shadow-xl p-8 text-center space-y-6"
        style={{ fontFamily: "'SF Pro Text', 'San Francisco', sans-serif" }}
      >
        <div className="text-[#0A7307] text-6xl">✔</div>

        <h2 className="text-2xl font-bold text-black">{t('paymentSuccess.title')}</h2>

        <p className="text-[#0A7307]">{t('paymentSuccess.message')}</p>

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={handleGenerateTicket}
            className="bg-[#27A614] text-white py-2 px-4 rounded-md hover:bg-[#1F8B0F] transition shadow-md"
          >
            {t('paymentSuccess.viewTicket')}
          </button>
          <button
            onClick={() => navigate('/menu')}
            className="bg-white/70 text-[#0A7307] py-2 px-4 rounded-md border border-[#27A614]/30 hover:bg-white transition"
          >
            {t('paymentSuccess.backToMenu')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
