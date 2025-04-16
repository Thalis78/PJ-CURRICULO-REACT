import { useNavigate } from "react-router-dom";

const ProfessionalResume = () => {
  const navigate = useNavigate();
  const resumeData = {
    name: "Lucas Ferreira",
    title: "Desenvolvedor Front-End",
    contact: "lucas.ferreira@email.com • (11) 99999-9999 • São Paulo, SP",
    profile: {
      title: "Perfil",
      text: "Profissional com 3 anos de experiência em desenvolvimento front-end, especializado em interfaces modernas e performance. Apaixonado por design e inovação, buscando sempre melhorar a experiência do usuário e garantir acessibilidade nas soluções web.",
    },
    experience: [
      {
        company: "Tech Solutions",
        role: "Desenvolvedor Front-End",
        duration: "Jan 2022 - Presente",
        responsibilities: [
          "Desenvolvimento de aplicações web com React e TailwindCSS.",
          "Colaboração com equipes de design para interfaces responsivas.",
          "Integração com APIs e otimização de performance e UX.",
        ],
      },
      {
        company: "WebDev Agency",
        role: "Estagiário de Desenvolvimento",
        duration: "Jul 2020 - Dez 2021",
        responsibilities: [
          "Desenvolvimento de sites responsivos utilizando HTML, CSS e JavaScript.",
          "Apoio no desenvolvimento de funcionalidades simples.",
          "Correção de bugs e manutenção de sistemas legados.",
        ],
      },
    ],
    education: {
      institution: "Faculdade de Tecnologia FATEC",
      degree: "Análise e Desenvolvimento de Sistemas",
      duration: "2021 - 2024",
    },
    skills: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Git",
      "Figma",
      "HTML",
      "CSS",
      "JavaScript",
    ],
  };

  const handleEdit = () => {
    navigate("/edit", { state: { resumeData } }); // Alteração aqui para usar navigate
  };
  return (
    <>
      <div className="h-10"></div>
      <button
        onClick={handleEdit}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Editar
      </button>

      <div
        id="pdf-content"
        className="max-w-3xl mx-auto bg-white text-gray-900 shadow-lg rounded-3xl overflow-hidden font-sans"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start p-8 bg-gray-50 shadow-md rounded-t-3xl">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Foto do Candidato"
            className="w-32 h-32 rounded-full border-4 border-indigo-600 shadow-md"
          />
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h1 className="text-3xl font-semibold text-gray-900">
              {resumeData.name}
            </h1>
            <p className="text-lg text-indigo-600 mt-1">{resumeData.title}</p>
            <p className="mt-1 text-sm text-gray-600">{resumeData.contact}</p>
          </div>
        </div>

        {/* Corpo do currículo */}
        <div className="p-8 space-y-8">
          {/* Perfil */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-4 border-indigo-600 pb-1">
              {resumeData.profile.title}
            </h2>
            <p className="text-base leading-relaxed text-gray-700">
              {resumeData.profile.text}
            </p>
          </section>

          {/* Experiência */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-4 border-indigo-600 pb-1">
              Experiência
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {exp.company} — {exp.role}
                </h3>
                <p className="text-sm text-gray-600 italic">{exp.duration}</p>
                <ul className="list-disc list-inside text-base mt-2 text-gray-700">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Educação */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-4 border-indigo-600 pb-1">
              Educação
            </h2>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {resumeData.education.institution}
              </h3>
              <p className="text-base text-gray-600">
                {resumeData.education.degree} — {resumeData.education.duration}
              </p>
            </div>
          </section>

          {/* Habilidades */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-4 border-indigo-600 pb-1">
              Habilidades
            </h2>
            <div className="flex flex-wrap gap-4">
              {resumeData.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-semibold shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="h-10"></div>
    </>
  );
};

export { ProfessionalResume };
