import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./pages/main.tsx";
import { EditResume } from "./pages/update/index.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/edit" element={<EditResume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
