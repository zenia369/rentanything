import { FC, ReactNode } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ModalProps {
  children: ReactNode;
  handleClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, handleClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/25 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-md p-4 relative w-3/4 h-3/4 overflow-y-auto">
        <button
          type="button"
          className="absolute top-0 right-0 text-3xl"
          onClick={handleClose}
        >
          <IoIosCloseCircleOutline />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
