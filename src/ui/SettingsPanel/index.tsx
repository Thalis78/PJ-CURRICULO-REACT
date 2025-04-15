import React, { useState, useEffect } from "react";
declare var html2pdf: any;

type ThemeColor = "blue" | "rose" | "green" | "purple" | "gray";

const SettingsPanel = () => {
  const [font, setFont] = useState("font-inter");
  const [color, setColor] = useState<ThemeColor>("blue");
  const [pdfName, setPdfName] = useState("curriculo");
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("img.png");

  useEffect(() => {
    const fontMap: any = {
      "font-inter": "Inter, sans-serif",
      "font-georgia": "Georgia, serif",
      "font-playfair": "'Playfair Display', serif",
    };
    const content = document.getElementById("pdf-content");
    if (content) content.style.fontFamily = fontMap[font];
  }, [font]);

  useEffect(() => {
    const colorMap: Record<ThemeColor, string> = {
      blue: "#3b82f6",
      rose: "#f43f5e",
      green: "#10b981",
      purple: "#8b5cf6",
      gray: "#9ca3af",
    };

    const selectedColor = colorMap[color] || colorMap["blue"];
    const content = document.getElementById("pdf-content");
    if (content) content.style.backgroundColor = selectedColor;
  }, [color]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      if (file) reader.readAsDataURL(file);
    }
  };

  const handlePdf = () => {
    const element = document.getElementById("pdf-content");

    setTimeout(() => {
      html2pdf()
        .set({
          margin: 10,
          filename: `${pdfName}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            scrollY: 0,
            windowWidth: window.innerWidth,
            windowHeight: element?.scrollHeight || 800,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .toPdf((pdf: any) => {
          const pageHeight = pdf.internal.pageSize.height;
          const contentHeight = element?.scrollHeight || 0;
          if (contentHeight > pageHeight) {
            pdf.deletePage(2);
          }
        })
        .save();
    }, 300);
  };

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full bg-white border-b border-gray-200 shadow-lg py-8 px-6 lg:px-8">
      <div className="absolute top-0 right-0 mr-4 mt-4">
        <button
          onClick={toggleSettings}
          className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none transition-all duration-300 ease-in-out p-2 rounded-full shadow-sm"
        >
          {isOpen ? (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Fechar Configurações</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12h18M12 3v18" />
              </svg>
              <span>Abrir Configurações</span>
            </>
          )}
        </button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0 block"
            : "opacity-0 translate-y-4 hidden"
        } max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8`}
      >
        <div className="flex flex-col">
          <label
            htmlFor="fontSelect"
            className="text-sm font-semibold text-gray-700 mb-2"
          >
            Fonte
          </label>
          <select
            id="fontSelect"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFont(e.target.value)}
          >
            <option value="font-inter">Inter</option>
            <option value="font-georgia">Georgia</option>
            <option value="font-playfair">Playfair Display</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="colorSelect"
            className="text-sm font-semibold text-gray-700 mb-2"
          >
            Cor do Currículo
          </label>
          <select
            id="colorSelect"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            onChange={(e) => setColor(e.target.value as ThemeColor)}
          >
            <option value="blue">Azul</option>
            <option value="rose">Rosa</option>
            <option value="green">Verde</option>
            <option value="purple">Roxo</option>
            <option value="gray">Cinza</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="pdfName"
            className="text-sm font-semibold text-gray-700 mb-2"
          >
            Nome do PDF
          </label>
          <input
            type="text"
            id="pdfName"
            placeholder="Ex: marcia-nogue.pdf"
            value={pdfName}
            onChange={(e) => setPdfName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center sm:justify-end items-center">
          <button
            id="btn-pdf"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md transition duration-200 text-base"
            onClick={handlePdf}
          >
            📄 Salvar como PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export { SettingsPanel };
