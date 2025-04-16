const Header = () => {
  return (
    <header
      id="header"
      className="bg-blue-700 text-white py-4 px-3 shadow-md no-print"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 flex-wrap">
        <h1 className="text-xl sm:text-2xl text-center sm:text-left tracking-tight leading-tight">
          📄 Currículo Profissional
        </h1>
        <div className="text-xs sm:text-sm text-gray-100 text-center sm:text-right space-y-1">
          <p>
            Desenvolvido por{" "}
            <span className="font-semibold text-white">Thalisson Moura</span>
          </p>
          <a
            href="https://thalissondev.netlify.app/"
            className="inline-block font-semibold px-2 py-1 rounded transition-all duration-200
             hover:bg-white hover:text-blue-700 border border-transparent hover:border-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            🌐 Acompanhar trabalho
          </a>
        </div>
      </div>
    </header>
  );
};

export { Header };
