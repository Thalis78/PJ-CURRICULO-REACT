type ModalProps = {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const Modal = ({ message, onCancel, onConfirm }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <p className="text-lg text-gray-800 mb-6 text-center">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition duration-200 w-full sm:w-auto"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 w-full sm:w-auto"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export { Modal };
