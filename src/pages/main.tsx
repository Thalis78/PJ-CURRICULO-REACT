import { useState, useEffect } from "react";
import { useCurriculo } from "../modules/hooks/use-curriculo";
import { Header } from "../ui/header";
import { SettingsPanel } from "../ui/SettingsPanel";
import { Curriculum } from "../ui";
import { Spinner } from "../ui/spinner";
import { useLocation } from "react-router-dom";

const Main = () => {
  const { curriculo, getCurriculo } = useCurriculo();
  const [loading, setLoading] = useState(true);
  const [themeColor, setThemeColor] = useState("black");
  const { state } = useLocation();

  useEffect(() => {
    if (state?.curriculo) {
      setLoading(false);
    } else if (!curriculo) {
      getCurriculo();
    } else {
      setLoading(false);
    }
  }, [curriculo, getCurriculo, state]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <SettingsPanel setThemeColor={setThemeColor} themeColor={themeColor} />
      <div className="h-10"></div>
      <Curriculum
        dadosCurriculo={state?.curriculo || curriculo}
        themeColor={themeColor}
      />
    </>
  );
};

export { Main };
