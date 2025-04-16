import { useContext } from "react";
import { CurriculoContext } from "../provider";

export const useCurriculo = () => {
    const value = useContext(CurriculoContext);

    if (!value) {
        throw new Error("You must wrap your component with CurriculoProvider");
    }

    return value;
};