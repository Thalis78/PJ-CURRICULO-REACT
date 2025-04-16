import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./pages/main";
import { CurriculoProvider } from "./modules/provider";

function App() {
  return (
    <CurriculoProvider>
      {" "}
      {}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </CurriculoProvider>
  );
}

export default App;
