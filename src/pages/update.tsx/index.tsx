import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "../../ui/modal";
import { Header } from "../../ui/header";
import { FaArrowLeft } from "react-icons/fa";

const EditCurriculum = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [curriculum, setCurriculum] = useState<any>(state?.curriculo || null);

  const [expandedSectionIndex, setExpandedSectionIndex] = useState<
    number | null
  >(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentAction, setCurrentAction] = useState<any>(null);

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!curriculum) navigate("/");
  }, [curriculum, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const keys = key.split(".");
    if (keys.length > 1) {
      setCurriculum((prev: any) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: e.target.value },
      }));
    } else {
      setCurriculum({ ...curriculum, [key]: e.target.value });
    }
  };

  const handleItemChange = (
    sectionIndex: number,
    entryIndex: number,
    key: string,
    value: string
  ) => {
    const updatedSections = [...curriculum.secoes];
    const section = updatedSections[sectionIndex];

    if (section.tipo === "experiencia" || section.tipo === "certificados") {
      section.itens[entryIndex][key] = value;
    } else if (section.tipo === "habilidades") {
      section.itens[entryIndex] = value;
    } else {
      section.itens[entryIndex] = value;
    }

    setCurriculum({ ...curriculum, secoes: updatedSections });
  };

  const handleAddItem = (sectionIndex: number) => {
    const updatedSections = [...curriculum.secoes];
    const section = updatedSections[sectionIndex];

    if (section.tipo === "experiencia") {
      section.itens.push({
        empresa: "",
        cargo: "",
        periodo: "",
        descricao: "",
      });
    } else if (section.tipo === "formacao") {
      section.itens.push({
        instituicao: "",
        curso: "",
        anoConclusao: "",
      });
    } else if (
      section.tipo === "habilidades" ||
      section.tipo === "certificados"
    ) {
      section.itens.push(
        section.tipo === "habilidades"
          ? ""
          : {
              titulo: "",
              instituicao: "",
              ano: "",
            }
      );
    }

    setCurriculum({ ...curriculum, secoes: updatedSections });
  };

  const handleRemoveItem = (sectionIndex: number, entryIndex: number) => {
    setCurrentAction(() => () => {
      const updatedSections = [...curriculum.secoes];
      updatedSections[sectionIndex].itens.splice(entryIndex, 1);
      setCurriculum({ ...curriculum, secoes: updatedSections });
      setShowModal(false);
    });

    setShowModal(true);
  };

  const toggleSection = (index: number) => {
    if (expandedSectionIndex === index) {
      setExpandedSectionIndex(null);
    } else {
      setExpandedSectionIndex(index);
    }
  };

  const handleSave = () => {
    navigate("/", { state: { curriculo: curriculum } });
  };

  if (!curriculum)
    return <div className="text-center py-10">Carregando...</div>;

  return (
    <>
      <Header />
      <div className="h-10"></div>
      <div className="container mx-auto p-8 max-w-3xl bg-white rounded-xl shadow-xl">
        <button
          onClick={handleBack}
          className="flex items-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out"
        >
          <FaArrowLeft className="mr-2" /> Voltar
        </button>
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Editar Currículo
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Nome
            </label>
            <input
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={curriculum.nome}
              onChange={(e) => handleChange(e, "nome")}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={curriculum.contato?.email || ""}
              onChange={(e) => handleChange(e, "contato.email")}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="tel"
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={curriculum.contato?.telefone || ""}
              onChange={(e) => handleChange(e, "contato.telefone")}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Endereço
            </label>
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={curriculum.contato?.endereco || ""}
              onChange={(e) => handleChange(e, "contato.endereco")}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Objetivo
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={curriculum.objetivo}
              onChange={(e) => handleChange(e, "objetivo")}
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Resumo
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={curriculum.resumo}
              onChange={(e) => handleChange(e, "resumo")}
            />
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        {curriculum.secoes.map((section: any, sectionIndex: number) => (
          <div key={sectionIndex}>
            <div
              className="bg-gray-100  mb-8 px-6 py-3 font-semibold cursor-pointer flex justify-between items-center rounded-xl shadow-lg hover:bg-gray-200 transition-all"
              onClick={() => toggleSection(sectionIndex)}
            >
              <span className="text-gray-900 text-lg">{section.titulo}</span>
              <span className="text-gray-500">
                {expandedSectionIndex === sectionIndex ? "▲" : "▼"}
              </span>
            </div>

            {expandedSectionIndex === sectionIndex && (
              <div className="p-6 space-y-4 bg-gray-50 rounded-xl shadow-sm">
                {section.itens.map((item: any, entryIndex: number) => (
                  <div
                    key={entryIndex}
                    className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md"
                  >
                    {section.tipo === "experiencia" && (
                      <>
                        <input
                          className="p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Empresa"
                          value={item.empresa}
                          onChange={(e) =>
                            handleItemChange(
                              sectionIndex,
                              entryIndex,
                              "empresa",
                              e.target.value
                            )
                          }
                        />
                        <input
                          className="p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Cargo"
                          value={item.cargo}
                          onChange={(e) =>
                            handleItemChange(
                              sectionIndex,
                              entryIndex,
                              "cargo",
                              e.target.value
                            )
                          }
                        />
                        <input
                          className="p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Período"
                          value={item.periodo}
                          onChange={(e) =>
                            handleItemChange(
                              sectionIndex,
                              entryIndex,
                              "periodo",
                              e.target.value
                            )
                          }
                        />
                        <textarea
                          className="p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Descrição"
                          value={item.descricao}
                          onChange={(e) =>
                            handleItemChange(
                              sectionIndex,
                              entryIndex,
                              "descricao",
                              e.target.value
                            )
                          }
                        />
                      </>
                    )}

                    {section.tipo === "formacao" && (
                      <>
                        <input
                          className="p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Instituição"
                          value={item.instituicao}
                          onChange={(e) =>
                            handleItemChange(
                              sectionIndex,
                              entryIndex,
                              "instituicao",
                              e.target.value
                            )
                          }
                        />
                        <input
                          className="p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Curso"
                          value={item.curso}
                          onChange={(e) =>
                            handleItemChange(
                              sectionIndex,
                              entryIndex,
                              "curso",
                              e.target.value
                            )
                          }
                        />
                        <input
                          className="p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ano de Conclusão"
                          value={item.anoConclusao}
                          onChange={(e) =>
                            handleItemChange(
                              sectionIndex,
                              entryIndex,
                              "anoConclusao",
                              e.target.value
                            )
                          }
                        />
                      </>
                    )}

                    {section.tipo === "habilidades" && (
                      <>
                        <input
                          className="p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Habilidade"
                          value={item}
                          onChange={(e) =>
                            handleItemChange(
                              sectionIndex,
                              entryIndex,
                              "",
                              e.target.value
                            )
                          }
                        />
                      </>
                    )}

                    {section.tipo === "certificados" && (
                      <>
                        <input
                          className="p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Título"
                          value={item.titulo}
                          onChange={(e) =>
                            handleItemChange(
                              sectionIndex,
                              entryIndex,
                              "titulo",
                              e.target.value
                            )
                          }
                        />
                        <input
                          className="p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Instituição"
                          value={item.instituicao}
                          onChange={(e) =>
                            handleItemChange(
                              sectionIndex,
                              entryIndex,
                              "instituicao",
                              e.target.value
                            )
                          }
                        />
                        <input
                          className="p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ano"
                          value={item.ano}
                          onChange={(e) =>
                            handleItemChange(
                              sectionIndex,
                              entryIndex,
                              "ano",
                              e.target.value
                            )
                          }
                        />
                      </>
                    )}

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() =>
                          handleRemoveItem(sectionIndex, entryIndex)
                        }
                        className="text-red-500 hover:text-red-400 text-lg"
                      >
                        ✕ Remover
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => handleAddItem(sectionIndex)}
                  className="block mx-auto mt-4 px-8 py-3 text-lg text-white bg-green-600 rounded-xl shadow-md hover:bg-green-500 transition-all"
                >
                  + Adicionar Item
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleSave}
          className="block mx-auto mt-6 px-8 py-3 text-lg text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-500 transition-all"
        >
          Salvar Currículo
        </button>

        {showModal && (
          <Modal
            message="Tem certeza de que deseja remover este item?"
            onCancel={() => setShowModal(false)}
            onConfirm={currentAction}
          />
        )}
      </div>
    </>
  );
};

export { EditCurriculum };
