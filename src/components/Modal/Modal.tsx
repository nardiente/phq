import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      <div className="relative w-[600px] bg-white overflow-y-auto animate-slide-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Edit</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
