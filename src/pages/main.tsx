import { Header } from "../ui/header";
import { ProfessionalResume } from "../ui/modelosCurriculos";
import { SettingsPanel } from "../ui/SettingsPanel";

const Main = () => {
  return (
    <>
      <Header />
      <SettingsPanel />
      <ProfessionalResume />
    </>
  );
};

export { Main };
