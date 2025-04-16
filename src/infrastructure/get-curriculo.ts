import { defaultCurriculo } from "../const";

const getCurriculo = async () => {
  try {
    const response = defaultCurriculo;
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
export { getCurriculo };
