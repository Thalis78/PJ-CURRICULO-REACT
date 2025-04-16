import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./pages/main";
import { CurriculoProvider } from "./modules/provider"; // Importe o CurriculoProvider

function App() {
  return (
    <CurriculoProvider> {/* Envolva o BrowserRouter com o CurriculoProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </CurriculoProvider>
  );
}

export default App;
