import { useEffect } from "react";
import { useCurriculo } from "../modules/hooks/use-curriculo";
const Main = () => {
  const { curriculo, getCurriculo } = useCurriculo();

  useEffect(() => {
    if (!curriculo) {
      getCurriculo();
    }
  }, [curriculo, getCurriculo]);

  if (!curriculo) {
    return <div>Carregando...</div>;
  }
  console.log(curriculo);

};

export { Main };
