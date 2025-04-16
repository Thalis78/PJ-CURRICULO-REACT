import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EditCurriculum = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [curriculum, setCurriculum] = useState<any>(state?.curriculo || null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCurriculum({ ...curriculum, imagem: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveItem = (sectionIndex: number, entryIndex: number) => {
    const sections = [...curriculum.secoes];
    sections[sectionIndex].itens.splice(entryIndex, 1);
    setCurriculum({ ...curriculum, secoes: sections });
  };

  const handleRemoveSection = (sectionIndex: number) => {
    const updatedSections = curriculum.secoes.filter(
      (_: any, index: any) => index !== sectionIndex
    );
    setCurriculum({ ...curriculum, secoes: updatedSections });
  };

  const handleItemChange = (
    sectionIndex: number,
    entryIndex: number,
    key: string,
    value: string
  ) => {
    const sections = [...curriculum.secoes];
    const section = sections[sectionIndex];

    if (section.tipo === "texto") {
      section.itens[entryIndex].descricao = value;
    } else if (section.tipo === "habilidades") {
      section.itens[entryIndex] = value;
    } else {
      section.itens[entryIndex][key] = value;
    }

    setCurriculum({ ...curriculum, secoes: sections });
  };

  const handleSave = () => {
    navigate("/", { state: { curriculo: curriculum } });
  };

  if (!curriculum)
    return <div className="text-center py-10">Carregando...</div>;

  return (
    <div className="container mx-auto p-8 max-w-lg bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">
        Editar Currículo
      </h1>

      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            src={curriculum.imagem || "https://via.placeholder.com/150"}
            alt="Foto de Perfil"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>

        <label
          htmlFor="profile-upload"
          className="mt-4 cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          Selecionar nova foto
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div className="space-y-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-600">
          Informações Pessoais
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome completo
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Nome completo"
            value={curriculum.nome}
            onChange={(e) => handleChange(e, "nome")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={curriculum.contato?.email || ""}
            onChange={(e) => handleChange(e, "contato.email")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <input
            type="tel"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Telefone"
            value={curriculum.contato?.telefone || ""}
            onChange={(e) => handleChange(e, "contato.telefone")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Endereço
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Endereço"
            value={curriculum.contato?.endereco || ""}
            onChange={(e) => handleChange(e, "contato.endereco")}
          />
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-600">Objetivo</h2>
        <div>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Objetivo"
            value={curriculum.objetivo}
            onChange={(e) => handleChange(e, "objetivo")}
          />
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-600">Resumo</h2>
        <div>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Resumo"
            value={curriculum.resumo}
            onChange={(e) => handleChange(e, "resumo")}
          />
        </div>
      </div>

      {curriculum.secoes.map((section: any, sectionIndex: number) => (
        <div key={sectionIndex} className="space-y-6 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-blue-600">
              {section.titulo}
            </h2>
            <button
              onClick={() => handleRemoveSection(sectionIndex)}
              className="text-sm text-red-500 hover:underline"
            >
              Remover
            </button>
          </div>

          {section.itens.map((entry: any, entryIndex: number) => (
            <div
              key={entryIndex}
              className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-3"
            >
              {section.tipo === "habilidades" ? (
                <div className="flex gap-4 items-center">
                  <input
                    className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    value={entry}
                    onChange={(e) =>
                      handleItemChange(
                        sectionIndex,
                        entryIndex,
                        "",
                        e.target.value
                      )
                    }
                  />
                  <button
                    onClick={() => handleRemoveItem(sectionIndex, entryIndex)}
                    className="text-red-500 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ) : section.tipo === "certificados" ? (
                <div className="space-y-3">
                  <input
                    className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Título"
                    value={entry.titulo}
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
                    className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Instituição"
                    value={entry.instituicao}
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
                    className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Ano"
                    value={entry.ano}
                    onChange={(e) =>
                      handleItemChange(
                        sectionIndex,
                        entryIndex,
                        "ano",
                        e.target.value
                      )
                    }
                  />
                  <button
                    onClick={() => handleRemoveItem(sectionIndex, entryIndex)}
                    className="text-xs text-red-500"
                  >
                    Excluir
                  </button>
                </div>
              ) : section.tipo === "formacao" ? (
                <div className="space-y-3">
                  <input
                    className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Instituição"
                    value={entry.instituicao}
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
                    className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Curso"
                    value={entry.curso}
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
                    className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Ano de Conclusão"
                    value={entry.anoConclusao}
                    onChange={(e) =>
                      handleItemChange(
                        sectionIndex,
                        entryIndex,
                        "anoConclusao",
                        e.target.value
                      )
                    }
                  />
                  <button
                    onClick={() => handleRemoveItem(sectionIndex, entryIndex)}
                    className="text-xs text-red-500"
                  >
                    Excluir
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Título"
                    value={entry.titulo}
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
                    className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Ano"
                    value={entry.ano}
                    onChange={(e) =>
                      handleItemChange(
                        sectionIndex,
                        entryIndex,
                        "ano",
                        e.target.value
                      )
                    }
                  />
                  <textarea
                    className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Descrição"
                    value={entry.descricao}
                    onChange={(e) =>
                      handleItemChange(
                        sectionIndex,
                        entryIndex,
                        "descricao",
                        e.target.value
                      )
                    }
                  />
                  <button
                    onClick={() => handleRemoveItem(sectionIndex, entryIndex)}
                    className="text-xs text-red-500"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSave}
        className="w-full py-3 mt-8 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-500"
      >
        Salvar Currículo
      </button>
    </div>
  );
};

export { EditCurriculum };
