import { useEffect, useState } from "react";
import { useCurriculo } from "../modules/hooks/use-curriculo";
import { Header } from "../ui/header";
import { SettingsPanel } from "../ui/SettingsPanel";
import { Curriculum } from "../ui";
import { Spinner } from "../ui/spinner";

const Main = () => {
  const { curriculo, getCurriculo } = useCurriculo();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!curriculo) {
      getCurriculo();
    } else {
      setLoading(false);
    }
  }, [curriculo, getCurriculo]);

  if (loading) {
    return <Spinner />;
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
