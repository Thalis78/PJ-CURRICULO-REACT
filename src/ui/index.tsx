import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaRegHandshake,
  FaUserGraduate,
  FaBullhorn,
} from "react-icons/fa";

const Curriculum = ({ dadosCurriculo, imageShape }: any) => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen py-8 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          id="pdf-content"
          className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row border border-gray-200 print:max-w-full print:shadow-none print:rounded-none"
        >
          <aside className="bg-blue-600 text-white p-6 md:w-1/3 print:bg-blue-600">
            <div className="flex flex-col items-center mb-6">
              {imageShape !== "none" && (
                <img
                  src={
                    dadosCurriculo.imagem || "https://via.placeholder.com/150"
                  }
                  alt="Foto de Perfil"
                  className={`w-32 h-32 border-4 border-white mb-4 object-cover ${
                    imageShape === "round" ? "rounded-full" : "rounded-none"
                  }`}
                />
              )}
              <h1 className="text-xl font-semibold text-center">
                {dadosCurriculo.nome}
              </h1>
            </div>

            <div className="text-sm space-y-4">
              <div>
                <h2 className="font-semibold text-lg mb-2 flex items-center">
                  <FaEnvelope className="mr-2" />
                  Contato
                </h2>
                <p>{dadosCurriculo.contato.email}</p>
                <p>{dadosCurriculo.contato.telefone}</p>
                <p>{dadosCurriculo.contato.endereco}</p>
              </div>

              {habilidades.length > 0 && (
                <div>
                  <h2 className="font-semibold text-lg mb-2 flex items-center">
                    <FaRegHandshake className="mr-2" />
                    Habilidades
                  </h2>
                  <ul className="list-disc list-inside space-y-1">
                    {habilidades.map((hab: string, idx: number) => (
                      <li key={idx}>{hab}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>

          <main className="p-6 md:w-2/3 bg-blue-50 text-blue-900">
            {objetivo && (
              <section className="mb-6">
                <h2 className="text-2xl font-semibold border-b-2 border-blue-300 pb-2 mb-4 flex items-center">
                  <FaBullhorn className="mr-2" />
                  Objetivo
                </h2>
                <p className="text-gray-800">{dadosCurriculo.objetivo}</p>
              </section>
            )}

            <section className="mb-6">
              <h2 className="text-2xl font-semibold border-b-2 border-blue-300 pb-2 mb-4">
                Resumo
              </h2>
              <p className="text-gray-800">{dadosCurriculo.resumo}</p>
            </section>

            {experiencias.length > 0 && (
              <section className="mb-6">
                <h2 className="text-2xl font-semibold border-b-2 border-blue-300 pb-2 mb-4 flex items-center">
                  <FaRegHandshake className="mr-2" />
                  Experiência Profissional
                </h2>
                {experiencias.map((item: any, idx: number) => (
                  <div key={idx} className="mb-4">
                    <h3 className="text-lg font-semibold">
                      {item.empresa} — {item.cargo}
                    </h3>
                    <p className="text-sm text-blue-700">{item.periodo}</p>
                    <p className="text-gray-700">{item.descricao}</p>
                  </div>
                ))}
              </section>
            )}

            {formacoes.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold border-b-2 border-blue-300 pb-2 mb-4 flex items-center">
                  <FaUserGraduate className="mr-2" />
                  Formação Acadêmica
                </h2>
                {formacoes.map((item: any, idx: number) => (
                  <div key={idx} className="mb-4">
                    <h3 className="text-lg font-semibold">
                      {item.instituicao}
                    </h3>
                    <p className="text-sm text-blue-700">
                      {item.curso} — {item.anoConclusao}
                    </p>
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>
        <div className="flex justify-center mb-8">
          <button
            id="btn-pdf"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={handleEdit}
          >
            Editar Currículo
          </button>
        </div>
      </div>
    </div>
  );
};

export { Curriculum };
