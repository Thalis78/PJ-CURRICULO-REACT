import { useEffect, useState } from "react";
import { useCurriculo } from "../modules/hooks/use-curriculo";
import { Header } from "../ui/header";
import { SettingsPanel } from "../ui/SettingsPanel";
import { Curriculum } from "../ui";

const Main = () => {
  const { curriculo, getCurriculo } = useCurriculo();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!curriculo) {
      getCurriculo();
    } else {
      setLoading(false);  // Dados carregados, então o loading pode ser removido
    }
  }, [curriculo, getCurriculo]);

  // Se ainda estiver carregando, exibe uma mensagem ou spinner.
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />
      <SettingsPanel />
      <Curriculum dadosCurriculo={curriculo} />
    </>
  );
};

export { Main };
