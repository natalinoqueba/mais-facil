import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";

const MyTickets = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("tickets");
    if (stored) {
      setTickets(JSON.parse(stored));
    }
  }, []);

  const handleDownload = async (ticket) => {
    const doc = new jsPDF();
    const formattedDate = new Date(ticket.createdAt).toLocaleString("pt-BR");

    doc.setFontSize(14);
    doc.setTextColor("#0A7307");
    doc.text(`Passagem - ${ticket.company}`, 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Bilhete Nº: ${ticket.ticketNumber}`, 20, 30);
    doc.text(`Data de Emissão: ${formattedDate}`, 20, 38);

    doc.text(`Partida: ${ticket.departure}`, 20, 48);
    doc.text(`Destino: ${ticket.destination}`, 20, 56);
    doc.text(`Data da Viagem: ${ticket.date}`, 20, 64);
    doc.text(`Quantidade: ${ticket.quantity}`, 20, 72);
    doc.text(`Número Familiar: ${ticket.familyContact}`, 20, 80);
    doc.text(`Pagamento: ${ticket.paymentMethod || "N/A"}`, 20, 88);

    doc.text(`Preço Unitário: MZN ${ticket.unitPrice}`, 20, 96);
    doc.text(`Valor Total: MZN ${ticket.totalPrice}`, 20, 104);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      "Suporte: (+258) 84 624 8290 | (+258) 87 383 5760 | Facilnampula@gmail.com",
      20,
      114
    );

    const pdfOutput = doc.output("datauristring").split(",")[1];
    const fileName = `bilhete-${ticket.ticketNumber}.pdf`;

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
          contentType: "application/pdf",
        });
      } else {
        doc.save(fileName);
      }
    } catch (err) {
      console.error("Erro ao salvar/abrir PDF:", err);
    }
  };

  return (
    <div className="min-h-screen pt-[95px] pb-12 px-4 bg-white text-[#0A7307] font-sfpro">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          {t("myTickets.title")}
        </h2>

        {tickets.length === 0 ? (
          <p className="text-center text-gray-500">{t("myTickets.none")}</p>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 shadow-md border border-[#27A614]/30 bg-white/30 backdrop-blur-md text-[#0A7307]"
              >
                <div>
                  <h3 className="text-lg font-bold">
                    {ticket.destination} ({ticket.company})
                  </h3>
                  <p className="text-sm">
                    {t("myTickets.ticketNumber")}: {ticket.ticketNumber}
                  </p>
                  <p className="text-sm">
                    {t("myTickets.departure")}: {ticket.departure}
                  </p>
                  <p className="text-sm">
                    {t("myTickets.date")}: {ticket.date}
                  </p>
                  <p className="text-sm">
                    {t("myTickets.quantity")}: {ticket.quantity}
                  </p>
                  <p className="text-sm">
                    {t("myTickets.familyContact")}: {ticket.familyContact}
                  </p>
                  <p className="text-sm">
                    {/* {t("myTickets.paymentMethod")}: {ticket.paymentMethod || "N/A"} */}
                  </p>
                  <p className="text-sm">
                    {t("myTickets.unitPrice")}: {ticket.unitPrice} MT
                  </p>
                  <p className="text-sm">
                    {t("myTickets.totalPrice")}: {ticket.totalPrice} MT
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(ticket)}
                  className="bg-[#27A614] text-white py-2 px-4 hover:bg-[#1F8B0F] transition shadow-md rounded-md"
                >
                  {t("myTickets.download")}
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => navigate("/mainmenu")}
          className="mt-6 px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition font-medium"
        >
          {t("ticket.back")}
        </button>
      </div>
    </div>
  );
};

export default MyTickets;
