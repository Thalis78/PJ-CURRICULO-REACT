import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { Spinner } from "../../ui/spinner";

const EditResume = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(null);
  const [customSections, setCustomSections] = useState<any[]>([]);

  useEffect(() => {
    if (!state?.resumeData) {
      navigate("/");
    } else {
      setFormData(state.resumeData);
      setCustomSections(state.resumeData.customSections || []);
    }
  }, [state, navigate]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData({ ...formData, experience: updated });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev: any) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => {
    setFormData((prev: any) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        { company: "", role: "", duration: "" },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    const updated = [...formData.experience];
    updated.splice(index, 1);
    setFormData({ ...formData, experience: updated });
  };

  const addCustomSection = () => {
    setCustomSections([...customSections, { title: "", text: "", items: [] }]);
  };

  const removeCustomSection = (index: number) => {
    const updated = [...customSections];
    updated.splice(index, 1);
    setCustomSections(updated);
  };

  const handleCustomChange = (index: number, field: string, value: string) => {
    const updated = [...customSections];
    updated[index][field] = value;
    setCustomSections(updated);
  };

  const addCustomItem = (sectionIndex: number) => {
    const updated = [...customSections];
    updated[sectionIndex].items.push("");
    setCustomSections(updated);
  };

  const handleItemChange = (
    sectionIndex: number,
    itemIndex: number,
    value: string
  ) => {
    const updated = [...customSections];
    updated[sectionIndex].items[itemIndex] = value;
    setCustomSections(updated);
  };

  const removeCustomItem = (sectionIndex: number, itemIndex: number) => {
    const updated = [...customSections];
    updated[sectionIndex].items.splice(itemIndex, 1);
    setCustomSections(updated);
  };

  const handleSubmit = () => {
    navigate("/", {
      state: {
        resumeData: {
          ...formData,
          customSections,
        },
      },
    });
  };

  if (!formData) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-3xl mt-10 space-y-8">
      <h1 className="text-3xl font-bold text-center text-indigo-700">
        Editar Currículo
      </h1>

      <section className="grid md:grid-cols-3 gap-4">
        {["name", "title", "contact"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-semibold mb-1 capitalize">
              {field === "name"
                ? "Nome"
                : field === "title"
                ? "Título"
                : "Contato"}
            </label>
            <input
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        ))}
      </section>

      <section>
        <label className="block text-sm font-semibold mb-1">Imagem:</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full border rounded-lg px-3 py-2"
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Foto"
            className="mt-4 w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
        )}
      </section>

      <section>
        <label className="block text-sm font-semibold mb-1">Perfil:</label>
        <textarea
          value={formData.profile?.text}
          onChange={(e) =>
            setFormData((prev: any) => ({
              ...prev,
              profile: { ...prev.profile, text: e.target.value },
            }))
          }
          rows={4}
          className="w-full border rounded-lg px-3 py-2"
        />
      </section>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-indigo-700">Experiência</h2>
          <button
            onClick={addExperience}
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
          >
            <Plus size={18} /> Adicionar
          </button>
        </div>
        <div className="space-y-4">
          {formData.experience?.map((exp: any, index: number) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-xl shadow-sm grid md:grid-cols-3 gap-3 relative"
            >
              {["company", "role", "duration"].map((field) => (
                <input
                  key={field}
                  placeholder={
                    field === "company"
                      ? "Empresa"
                      : field === "role"
                      ? "Cargo"
                      : "Duração"
                  }
                  value={exp[field]}
                  onChange={(e) =>
                    handleExperienceChange(index, field, e.target.value)
                  }
                  className="border rounded-lg px-3 py-2"
                />
              ))}
              <button
                onClick={() => removeExperience(index)}
                className="absolute -top-2 -right-2 bg-red-100 text-red-500 hover:bg-red-200 p-1 rounded-full"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-indigo-700 mb-3">Educação</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {["institution", "degree", "duration"].map((field) => (
            <input
              key={field}
              placeholder={
                field === "institution"
                  ? "Instituição"
                  : field === "degree"
                  ? "Curso"
                  : "Duração"
              }
              value={formData.education?.[field]}
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  education: { ...prev.education, [field]: e.target.value },
                }))
              }
              className="border rounded-lg px-3 py-2"
            />
          ))}
        </div>
      </section>

      <section>
        <label className="block text-sm font-semibold mb-1">
          Habilidades (separadas por vírgula):
        </label>
        <input
          value={formData.skills?.join(", ")}
          onChange={(e) =>
            handleChange(
              "skills",
              e.target.value.split(",").map((s) => s.trim())
            )
          }
          className="w-full border rounded-lg px-3 py-2"
        />
      </section>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-indigo-700">
            Seções Personalizadas
          </h2>
          <button
            onClick={addCustomSection}
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
          >
            <Plus size={18} /> Nova Seção
          </button>
        </div>
        {customSections.map((sec: any, index: number) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-xl shadow-sm space-y-3 mb-4 relative"
          >
            <input
              placeholder="Título da Seção"
              value={sec.title}
              onChange={(e) =>
                handleCustomChange(index, "title", e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2"
            />
            <textarea
              placeholder="Texto da Seção"
              value={sec.text}
              onChange={(e) =>
                handleCustomChange(index, "text", e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
            />
            <div className="space-y-2">
              {sec.items.map((item: string, itemIndex: number) => (
                <div key={itemIndex} className="flex items-center gap-2">
                  <input
                    value={item}
                    onChange={(e) =>
                      handleItemChange(index, itemIndex, e.target.value)
                    }
                    className="flex-1 border rounded-lg px-3 py-2"
                    placeholder={`Item ${itemIndex + 1}`}
                  />
                  <button
                    onClick={() => removeCustomItem(index, itemIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addCustomItem(index)}
                className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <Plus size={16} /> Adicionar Item
              </button>
            </div>
            <button
              onClick={() => removeCustomSection(index)}
              className="absolute -top-2 -right-2 bg-red-100 text-red-500 hover:bg-red-200 p-1 rounded-full"
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
      </section>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export { EditResume };
