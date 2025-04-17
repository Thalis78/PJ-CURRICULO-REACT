import { useNavigate } from "react-router-dom";
declare var html2pdf: any;

import {
  FaEnvelope,
  FaRegHandshake,
  FaUserGraduate,
  FaBullhorn,
  FaPhone,
  FaMapMarkerAlt,
  FaAngleRight,
} from "react-icons/fa";

type CurriculumProps = {
  dadosCurriculo: any;
  imageShape?: string;
  themeColor: string;
};

const themeClasses: Record<string, any> = {
  blue: {
    sidebarBg: "bg-blue-600",
    sidebarText: "text-white",
    mainBg: "bg-blue-50",
    mainText: "text-blue-900",
    buttonBg: "bg-blue-600",
  },
  black: {
    sidebarBg: "bg-black",
    sidebarText: "text-white",
    mainBg: "bg-gray-900",
    mainText: "text-white",
    buttonBg: "bg-black",
  },
  pink: {
    sidebarBg: "bg-pink-500",
    sidebarText: "text-white",
    mainBg: "bg-pink-50",
    mainText: "text-pink-900",
    buttonBg: "bg-pink-600",
  },
  green: {
    sidebarBg: "bg-green-600",
    sidebarText: "text-white",
    mainBg: "bg-green-50",
    mainText: "text-green-900",
    buttonBg: "bg-green-600",
  },
  yellow: {
    sidebarBg: "bg-yellow-400",
    sidebarText: "text-black",
    mainBg: "bg-yellow-50",
    mainText: "text-yellow-900",
    buttonBg: "bg-yellow-500",
  },
  purple: {
    sidebarBg: "bg-purple-600",
    sidebarText: "text-white",
    mainBg: "bg-purple-50",
    mainText: "text-purple-900",
    buttonBg: "bg-purple-600",
  },
  orange: {
    sidebarBg: "bg-orange-600",
    sidebarText: "text-white",
    mainBg: "bg-orange-50",
    mainText: "text-orange-900",
    buttonBg: "bg-orange-600",
  },
  gray: {
    sidebarBg: "bg-gray-600",
    sidebarText: "text-white",
    mainBg: "bg-gray-50",
    mainText: "text-gray-900",
    buttonBg: "bg-gray-600",
  },
  red: {
    sidebarBg: "bg-red-600",
    sidebarText: "text-white",
    mainBg: "bg-red-50",
    mainText: "text-red-900",
    buttonBg: "bg-red-600",
  },
  indigo: {
    sidebarBg: "bg-indigo-600",
    sidebarText: "text-white",
    mainBg: "bg-indigo-50",
    mainText: "text-indigo-900",
    buttonBg: "bg-indigo-600",
  },
  teal: {
    sidebarBg: "bg-teal-600",
    sidebarText: "text-white",
    mainBg: "bg-teal-50",
    mainText: "text-teal-900",
    buttonBg: "bg-teal-600",
  },
  cyan: {
    sidebarBg: "bg-cyan-600",
    sidebarText: "text-white",
    mainBg: "bg-cyan-50",
    mainText: "text-cyan-900",
    buttonBg: "bg-cyan-600",
  },
  lime: {
    sidebarBg: "bg-lime-600",
    sidebarText: "text-white",
    mainBg: "bg-lime-50",
    mainText: "text-lime-900",
    buttonBg: "bg-lime-600",
  },
  rose: {
    sidebarBg: "bg-rose-600",
    sidebarText: "text-white",
    mainBg: "bg-rose-50",
    mainText: "text-rose-900",
    buttonBg: "bg-rose-600",
  },
};

const Curriculum = ({ dadosCurriculo, themeColor }: CurriculumProps) => {
  const navigate = useNavigate();

  const pdfName = "curriculo";

  const handleEdit = () => {
    navigate("/edit", { state: { curriculo: dadosCurriculo } });
  };

  if (!dadosCurriculo) return null;

  const habilidades =
    dadosCurriculo.secoes.find((sec: any) => sec.tipo === "habilidades")
      ?.itens || [];
  const experiencias =
    dadosCurriculo.secoes.find((sec: any) => sec.tipo === "experiencia")
      ?.itens || [];
  const formacoes =
    dadosCurriculo.secoes.find((sec: any) => sec.tipo === "formacao")?.itens ||
    [];
  const objetivo = dadosCurriculo.objetivo || "";

  const theme = themeClasses[themeColor] || themeClasses.blue;

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

    const fixedHeight = 1000;

    clone.style.minHeight = `${fixedHeight}px`;

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
          windowHeight: fixedHeight,
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

  return (
    <div className="min-h-screen  py-8 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          id="pdf-content"
          className={`shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row border border-gray-300 ${
            themeColor === "black" ? "text-black" : theme.mainText
          }`}
        >
          <aside
            className={`${theme.sidebarBg} ${theme.sidebarText} p-6 md:w-1/3 space-y-6`}
          >
            <div className="flex flex-col items-center mb-6">
              <div className="h-10"></div>
              <h1 className="text-3xl font-bold text-center mb-4">
                {dadosCurriculo.nome}
              </h1>
            </div>

            <div className="text-sm space-y-6">
              <div className="space-y-2">
                <h2 className="font-semibold text-lg flex items-center">
                  Contato:
                </h2>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-base" />
                    {dadosCurriculo.contato.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-base" />
                    {dadosCurriculo.contato.telefone}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-base" />
                    {dadosCurriculo.contato.endereco}
                  </p>
                </div>
              </div>

              {habilidades.length > 0 && (
                <div className="space-y-2">
                  <h2 className="font-semibold text-lg flex items-center">
                    <FaRegHandshake className="mr-2" />
                    Habilidades:
                  </h2>
                  <ul className="space-y-1">
                    {habilidades.map((hab: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-white"
                      >
                        <FaAngleRight className="text-white text-sm" />
                        {hab}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>

          <main className="p-6 md:w-2/3 space-y-6">
            {objetivo && (
              <section className="mb-6">
                <h2 className="text-2xl font-semibold border-b-2 border-opacity-30 pb-2 mb-4 flex items-center">
                  <FaBullhorn className="mr-2" />
                  Objetivo:
                </h2>
                <p>{objetivo}</p>
              </section>
            )}

            <section className="mb-6">
              <h2 className="text-2xl font-semibold border-b-2 border-opacity-30 pb-2 mb-4">
                Resumo:
              </h2>
              <p>{dadosCurriculo.resumo}</p>
            </section>

            {experiencias.length > 0 && (
              <section className="mb-6">
                <h2 className="text-2xl font-semibold border-b-2 border-opacity-30 pb-2 mb-4 flex items-center">
                  <FaRegHandshake className="mr-2" />
                  Experiência Profissional:
                </h2>
                {experiencias.map((item: any, idx: number) => (
                  <div key={idx} className="mb-4">
                    <h3 className="text-lg font-semibold">
                      {item.empresa} — {item.cargo}
                    </h3>
                    <p className="text-sm">{item.periodo}</p>
                    <p>{item.descricao}</p>
                  </div>
                ))}
              </section>
            )}

            {formacoes.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold border-b-2 border-opacity-30 pb-2 mb-4 flex items-center">
                  <FaUserGraduate className="mr-2" />
                  Formação Acadêmica:
                </h2>
                {formacoes.map((item: any, idx: number) => (
                  <div key={idx} className="mb-4">
                    <h3 className="text-lg font-semibold">
                      {item.instituicao}
                    </h3>
                    <p className="text-sm">
                      {item.curso} — {item.anoConclusao}
                    </p>
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>

        <div className="h-10"></div>
        <div className="flex justify-center mb-8 space-x-4">
          <button
            id="btn-pdf-edit"
            className="bg-black text-white px-8 py-3 rounded-lg hover:opacity-90 transition duration-200 ease-in-out"
            onClick={handleEdit}
          >
            ✏️ Editar Currículo
          </button>
          <button
            id="btn-pdf"
            className="bg-black text-white px-8 py-3 rounded-lg hover:opacity-90 transition duration-200 ease-in-out"
            onClick={handlePdf}
          >
            📄 Salvar como PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export { Curriculum };
