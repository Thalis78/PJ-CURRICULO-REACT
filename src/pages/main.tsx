import { useEffect, useState } from "react";
import { useCurriculo } from "../modules/hooks/use-curriculo";
import { Header } from "../ui/header";
import { SettingsPanel } from "../ui/SettingsPanel";
import { Curriculum } from "../ui";
import { Spinner } from "../ui/spinner";
import { useLocation } from "react-router-dom";

const Main = () => {
  const [imageShape, setImageShape] = useState("round");
  const { curriculo, getCurriculo } = useCurriculo();
  const [loading, setLoading] = useState(true);
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
      <SettingsPanel imageShape={imageShape} setImageShape={setImageShape} />
      <div className="h-10"></div>
      <Curriculum
        dadosCurriculo={state?.curriculo || curriculo}
        imageShape={imageShape}
      />
    </>
  );
};

export { Main };
