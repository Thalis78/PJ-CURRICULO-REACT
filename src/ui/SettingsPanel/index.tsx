import { useState, useEffect } from "react";
declare var html2pdf: any;

const SettingsPanel = ({
  imageShape,
  setImageShape,
}: {
  imageShape: string;
  setImageShape: (value: string) => void;
}) => {
  const [fontSize, setFontSize] = useState("16");
  const [font, setFont] = useState("font-inter");
  const [pdfName, setPdfName] = useState("curriculo");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fontMap: any = {
      "font-inter": "Inter, sans-serif",
      "font-georgia": "Georgia, serif",
      "font-playfair": "'Playfair Display', serif",
      "font-arial": "Arial, sans-serif",
      "font-times": "'Times New Roman', Times, serif",
      "font-roboto": "'Roboto', sans-serif",
      "font-lato": "'Lato', sans-serif",
      "font-merriweather": "'Merriweather', serif",
      "font-montserrat": "'Montserrat', sans-serif",
    };

    const content = document.getElementById("pdf-content");
    if (content) {
      content.style.fontFamily = fontMap[font];
    }
  }, [font]);

  useEffect(() => {
    const content = document.getElementById("pdf-content");
    if (content) {
      content.style.fontSize = `${fontSize}px`;
    }
  }, [fontSize]);

  const handlePdf = () => {
    const content = document.getElementById("pdf-content");
    if (!content) return;

    const printContainer = document.createElement("div");
    const clone = content.cloneNode(true) as HTMLElement;

    printContainer.appendChild(clone);
    document.body.appendChild(printContainer);

    printContainer.style.width = "794px";
    printContainer.style.margin = "0 auto";
    printContainer.style.padding = "20px";
    printContainer.style.background = "white";

    clone.style.width = "100%";
    clone.style.boxSizing = "border-box";

    const isMobile = window.innerWidth <= 800;

    html2pdf()
      .set({
        margin: 0,
        filename: `${pdfName}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2,
          scrollY: 0,
          windowWidth: isMobile ? 794 : window.innerWidth,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(printContainer)
      .save()
      .then(() => {
        printContainer.remove();
      });
  };

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full py-6 px-4 lg:px-6 rounded-lg">
      <div className="absolute top-0 right-0 mr-4 mt-4">
        <button
          onClick={toggleSettings}
          className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none p-3 rounded-full shadow-md transition-all duration-200 ease-in-out"
        >
          {isOpen ? (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="font-semibold">Fechar Configurações</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 12h18M12 3v18" />
              </svg>
              <span className="font-semibold">Abrir Configurações</span>
            </>
          )}
        </button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0 block"
            : "opacity-0 translate-y-4 hidden"
        } max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6`}
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
            value={font}
          >
            <option value="font-inter">Inter</option>
            <option value="font-georgia">Georgia</option>
            <option value="font-playfair">Playfair Display</option>
            <option value="font-arial">Arial</option>
            <option value="font-times">Times New Roman</option>
            <option value="font-roboto">Roboto</option>
            <option value="font-lato">Lato</option>
            <option value="font-merriweather">Merriweather</option>
            <option value="font-montserrat">Montserrat</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="fontSizePx"
            className="text-sm font-semibold text-gray-700 mb-2"
          >
            Tamanho da Fonte (px)
          </label>
          <input
            type="number"
            id="fontSizePx"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
            min={8}
            max={72}
          />
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

        <div className="flex flex-col lg:flex-row items-center justify-between col-span-full mt-4">
          <div className="flex flex-col w-full sm:w-1/2 lg:w-auto">
            <label
              htmlFor="imageShape"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Formato da Imagem
            </label>
            <select
              id="imageShape"
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setImageShape(e.target.value)}
              value={imageShape}
            >
              <option value="round">Redonda</option>
              <option value="square">Quadrada</option>
              <option value="none">Sem Imagem</option>
            </select>
          </div>

          <div className="flex justify-center sm:justify-end items-center mt-4 lg:mt-0 lg:ml-4">
            <button
              id="btn-pdf"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md transition duration-200 ease-in-out"
              onClick={handlePdf}
            >
              📄 Salvar como PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SettingsPanel };
