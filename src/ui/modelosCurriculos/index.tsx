import { useNavigate } from "react-router-dom";

const ProfessionalResume = ({ editedData }: { editedData?: any }) => {
  const navigate = useNavigate();

  const defaultData = {
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
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  const resumeData = editedData || defaultData;

  const handleEdit = () => {
    navigate("/edit", { state: { resumeData } });
  };

  return (
    <>
      <div className="h-10"></div>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleEdit}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg rounded-full shadow-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          Editar
        </button>
      </div>

      <div
        id="pdf-content"
        className="max-w-4xl mx-auto bg-white text-gray-900 shadow-xl rounded-3xl overflow-hidden font-sans"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start p-8 bg-gradient-to-r from-blue-100 via-blue-50 to-white shadow-lg rounded-t-3xl">
          <img
            src={resumeData.image}
            alt="Foto do Candidato"
            className="w-40 h-40 rounded-full border-8 border-blue-500 shadow-xl object-cover"
          />
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900">
              {resumeData.name}
            </h1>
            <p className="text-xl text-blue-600 mt-1">{resumeData.title}</p>
            <p className="mt-2 text-sm text-gray-600">{resumeData.contact}</p>
          </div>
        </div>

        <div className="p-8 space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-4 border-blue-600 pb-2">
              {resumeData.profile.title}
            </h2>
            <p className="text-base leading-relaxed text-gray-700">
              {resumeData.profile.text}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-4 border-blue-600 pb-2">
              Experiência
            </h2>
            {resumeData.experience.map((exp: any, index: number) => (
              <div
                key={index}
                className="mb-8 p-6 rounded-lg bg-gray-50 shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-gray-900">
                  {exp.company} — {exp.role}
                </h3>
                <p className="text-sm text-gray-600 italic">{exp.duration}</p>
                <ul className="list-disc list-inside text-base mt-2 text-gray-700">
                  {exp.responsibilities.map((resp: any, idx: any) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-4 border-blue-600 pb-2">
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

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-4 border-blue-600 pb-2">
              Habilidades
            </h2>
            <div className="flex flex-wrap gap-4">
              {resumeData.skills.map((skill: any) => (
                <span
                  key={skill}
                  className="bg-gradient-to-r from-blue-200 to-blue-100 text-blue-800 px-6 py-2 rounded-full text-sm font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {resumeData.customSections &&
            resumeData.customSections.map((section: any, index: number) => (
              <section key={index}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-4 border-blue-600 pb-2">
                  {section.title}
                </h2>
                {section.text && (
                  <p className="text-base leading-relaxed text-gray-700 mb-4">
                    {section.text}
                  </p>
                )}
                {section.items && section.items.length > 0 && (
                  <ul className="list-disc list-inside text-base text-gray-700 space-y-1">
                    {section.items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
        </div>
      </div>

      <div className="h-10"></div>
    </>
  );
};

export { ProfessionalResume };
