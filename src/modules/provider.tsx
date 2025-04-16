import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import { getCurriculo as infraGetCurriculo } from "../infrastructure/get-curriculo";

type Contato = {
    endereco: string;
    telefone: string;
    email: string;
    linkedin: string;
    github: string;
};

type Secao = {
    titulo: string;
    tipo: string;
    itens: any[];
};

type CurriculoType = {
    nome: string;
    contato: Contato;
    resumo: string;
    secoes: Secao[];
};

type CurriculoContextType = {
    curriculo: CurriculoType | null;
    getCurriculo: () => Promise<CurriculoType | undefined>;
};

export const CurriculoContext = createContext<CurriculoContextType | undefined>(
    undefined
);

type CurriculoProviderProps = {
    children: React.ReactNode;
};

export const CurriculoProvider = ({ children }: CurriculoProviderProps) => {
    const [curriculo, setCurriculo] = useState<CurriculoType | null>(null);

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
