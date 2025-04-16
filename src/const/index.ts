export const defaultCurriculo = {
  nome: "Marcia Nogueira",
  imagem:
    "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  contato: {
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    telefone: "(11) 91234-5678",
    email: "marcia.nogueira@email.com",
  },
  resumo:
    "Desenvolvedora Front-end com 5 anos de experiência em React, TypeScript e interfaces acessíveis.",
  secoes: [
    {
      titulo: "Experiência Profissional",
      tipo: "experiencia",
      itens: [
        {
          empresa: "TechCorp",
          cargo: "Front-end Developer",
          periodo: "2021 - Presente",
          descricao: "Desenvolvimento de interfaces escaláveis com React.",
        },
        {
          empresa: "InovaWeb",
          cargo: "Web Designer",
          periodo: "2018 - 2021",
          descricao: "Criação de layouts responsivos e identidades visuais.",
        },
      ],
    },
    {
      titulo: "Formação Acadêmica",
      tipo: "formacao",
      itens: [
        {
          instituicao: "Universidade XPTO",
          curso: "Sistemas de Informação",
          anoConclusao: 2017,
        },
      ],
    },
    {
      titulo: "Habilidades",
      tipo: "habilidades",
      itens: ["JavaScript", "React", "TypeScript", "Figma", "HTML/CSS"],
    },
    {
      titulo: "Certificados",
      tipo: "certificados",
      itens: [
        {
          titulo: "React Avançado",
          instituicao: "Rocketseat",
          ano: 2022,
        },
        {
          titulo: "TypeScript na Prática",
          instituicao: "Alura",
          ano: 2021,
        },
      ],
    },
  ],
};
