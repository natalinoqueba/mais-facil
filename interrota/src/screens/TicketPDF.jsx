import React, { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routeData from '../routes.json'; // Ajuste o caminho se necessário

const TicketPDF = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const savedTicket = localStorage.getItem('ticket');
    if (!savedTicket) return;

    const ticket = JSON.parse(savedTicket);
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR');
    const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const ticketNumber = Math.floor(Math.random() * 900000000 + 100000000);

    // Buscar preço por companhia e destino
    const priceUnit = routeData[ticket.company]?.[ticket.destination] || 0;
    const totalPrice = priceUnit * (parseInt(ticket.quantity) || 1);

    const doc = new jsPDF();
    const logo = new Image();
    logo.src = `${window.location.origin}/images/logo.png`;

    logo.onload = () => {
      // Logo
      doc.addImage(logo, 'PNG', 80, 10, 50, 20);

      // Título
      doc.setFontSize(14);
      doc.setTextColor('#0A7307');
      doc.text(`Passagem de Carro - ${ticket.company}`, 20, 40);

      doc.setDrawColor(0);
      doc.line(20, 43, 190, 43);

      // Bilhete
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`Bilhete Nº: ${ticketNumber}`, 20, 50);
      doc.text(`Data de Emissão: ${formattedDate} ${formattedTime}`, 20, 58);
      doc.line(20, 62, 190, 62);

      // Passageiro e veículo (fixo por enquanto)
      doc.text(`Passageiro: João Silva`, 20, 70);
      doc.text(`Veículo: HONDA, Placa: 723 ADM MC`, 20, 78);
      doc.line(20, 82, 190, 82);

      // Viagem
      doc.text(`Viagem: Nampula -> ${ticket.destination}`, 20, 90);
      doc.text(`Data: ${ticket.date}`, 20, 98);
      doc.text(`Horário: 08:00 - 10:00`, 20, 106);
      doc.text(`Local de Embarque: ${ticket.destination}`, 20, 114);
      doc.line(20, 118, 190, 118);

      // Pagamento
      doc.text(`Valor Total: MZN ${totalPrice.toFixed(2)}`, 20, 126);
      doc.text(`Pagamento: M-Pesa`, 20, 134);
      doc.line(20, 138, 190, 138);

      // Suporte
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text('Suporte: (+258) 84 123 4567 | www.maisfacil.com', 20, 146);

      // Salvar e redirecionar
      doc.save('interrota-bilhete.pdf');
      setTimeout(() => navigate('/mainmenu'), 1000);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black text-center px-4">
      <div className="max-w-md space-y-4">
        <h2 className="text-2xl font-bold">{t('pdf.generating')}</h2>
        <p>{t('pdf.redirect')}</p>
      </div>
    </div>
  );
};

export default TicketPDF;
