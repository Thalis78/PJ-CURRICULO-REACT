import { useState, useEffect } from "react";

type SettingsPanelProps = {
  themeColor: string;
  setThemeColor: (color: string) => void;
};

const SettingsPanel = ({ themeColor, setThemeColor }: SettingsPanelProps) => {
  const [fontSize, setFontSize] = useState("16");
  const [font, setFont] = useState("font-bebas");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fontMap: any = {
      "font-playfair": "'Playfair Display', serif",
      "font-roboto": "'Roboto', sans-serif",
      "font-montserrat": "'Montserrat', sans-serif",
      "font-lora": "'Lora', serif",
      "font-raleway": "'Raleway', sans-serif",
      "font-poppins": "'Poppins', sans-serif",
      "font-bebas": "'Bebas Neue', cursive",
      "font-open-sans": "'Open Sans', sans-serif",
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

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full py-6 px-4 lg:px-6 rounded-lg">
      <div className="absolute top-0 right-0 mr-4 mt-4">
        <button
          onClick={toggleSettings}
          className="flex items-center text-black p-3 rounded-full shadow-md transition-all duration-200 ease-in-out hover:bg-gray-100"
        >
          {isOpen ? (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
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
                strokeWidth={2}
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
            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
          >
            🖋️ Fonte
          </label>
          <select
            id="fontSelect"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFont(e.target.value)}
            value={font}
          >
            <option value="font-bebas">Bebas Neue</option>
            <option value="font-roboto">Roboto</option>
            <option value="font-montserrat">Montserrat</option>
            <option value="font-lora">Lora</option>
            <option value="font-raleway">Raleway</option>
            <option value="font-poppins">Poppins</option>
            <option value="font-playfair">Playfair Display</option>
            <option value="font-open-sans">Open Sans</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="fontSizePx"
            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
          >
            🔠 Tamanho da Fonte (px)
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
            htmlFor="themeColor"
            className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
          >
            🎨 Cor do Tema
          </label>
          <select
            id="themeColor"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setThemeColor(e.target.value)}
            value={themeColor}
          >
            <option value="black">Preto</option>
            <option value="pink">Rosa</option>
            <option value="green">Verde</option>
            <option value="blue">Azul</option>
            <option value="purple">Roxo</option>
            <option value="orange">Laranja</option>
            <option value="gray">Cinza</option>
            <option value="red">Vermelho</option>
            <option value="indigo">Índigo</option>
            <option value="teal">Verde-azulado</option>
            <option value="cyan">Ciano</option>
            <option value="lime">Limão</option>
            <option value="rose">Rosa claro</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export { SettingsPanel };
