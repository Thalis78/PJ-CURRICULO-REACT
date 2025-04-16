import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./pages/main";
import { CurriculoProvider } from "./modules/provider";
import { EditCurriculum } from "./pages/update.tsx";

function App() {
  return (
    <CurriculoProvider>
      {" "}
      {}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/edit" element={<EditCurriculum />} />
        </Routes>
      </BrowserRouter>
    </CurriculoProvider>
  );
}

export default App;
