import React, { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routeData from '../routes.json';

const TicketPDF = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const generatePDF = async () => {
      const savedTicket = localStorage.getItem('ticket');
      const userProfile = localStorage.getItem('userProfile');
      const selectedPayment = localStorage.getItem('selectedPayment'); // método de pagamento

      if (!savedTicket || !userProfile) return;

      const ticket = JSON.parse(savedTicket);
      const user = JSON.parse(userProfile);

      const now = new Date();
      const formattedDate = now.toLocaleDateString('pt-BR');
      const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      const ticketNumber = Math.floor(Math.random() * 900000000 + 100000000);

      const priceUnit = routeData[ticket.company]?.[ticket.destination] || 0;
      const totalPrice = priceUnit * (parseInt(ticket.quantity) || 1);

      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.setTextColor('#0A7307');
      doc.text(`Passagem de Carro - ${ticket.company}`, 20, 20);

      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`Bilhete Nº: ${ticketNumber}`, 20, 30);
      doc.text(`Data de Emissão: ${formattedDate} ${formattedTime}`, 20, 38);

      doc.text(`Passageiro: ${user.name}`, 20, 48);
      doc.text(`Contacto: ${user.contact}`, 20, 56);

      doc.text(`Viagem: Nampula -> ${ticket.destination}`, 20, 66);
      doc.text(`Data: ${ticket.date}`, 20, 74);
      doc.text(`Horário: 08:00 - 10:00`, 20, 82);
      doc.text(`Local de Embarque: Nampula`, 20, 90);

      doc.text(`Preço Unitário: MZN ${priceUnit.toFixed(2)}`, 20, 100);
      doc.text(`Quantidade: ${ticket.quantity}`, 20, 108);
      doc.text(`Valor Total: MZN ${totalPrice.toFixed(2)}`, 20, 116);
      doc.text(`Pagamento: ${selectedPayment || 'N/A'}`, 20, 124); // método de pagamento dinâmico

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text('Mais informações: (+258) 84 624 8290 | (+258) 87 383 5760 | Facilnampula@gmail.com', 20, 134);

      const pdfOutput = doc.output('datauristring').split(',')[1];
      const fileName = `bilhete-${ticketNumber}.pdf`;

      try {
        if (window.Capacitor?.isNativePlatform()) {
          const result = await Filesystem.writeFile({
            path: fileName,
            data: pdfOutput,
            directory: Directory.Documents,
            encoding: Encoding.Base64,
          });

          await FileOpener.open({
            filePath: result.uri,
            contentType: 'application/pdf',
          });
        } else {
          doc.save(fileName);
        }
      } catch (err) {
        console.error('Erro ao salvar ou abrir PDF:', err);
      }

      setTimeout(() => navigate('/mainmenu'), 1000);
    };

    generatePDF();
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
