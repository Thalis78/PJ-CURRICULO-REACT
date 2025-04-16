import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { getCurriculo as infraGetCurriculo } from "../infrastructure/get-curriculo";

export const CurriculoContext = createContext<any | undefined>(undefined);

type CurriculoProviderProps = {
  children: React.ReactNode;
};

export const CurriculoProvider = ({ children }: CurriculoProviderProps) => {
  const [curriculo, setCurriculo] = useState<any | null>(null);

  const getCurriculo = useCallback(async () => {
    try {
      const response = await infraGetCurriculo();
      if (!response) {
        throw new Error("Erro ao buscar currículo.");
      }
      setCurriculo(response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Get curriculo failed:", error.message);
        throw new Error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    getCurriculo();
  }, [getCurriculo]);

  const value = useMemo(
    () => ({ curriculo, getCurriculo }),
    [curriculo, getCurriculo]
  );

  return (
    <CurriculoContext.Provider value={value}>
      {children}
    </CurriculoContext.Provider>
  );
};
