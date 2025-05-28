import { useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { TypeOptions } from 'react-toastify';

interface ToastProps {
  duration?: number;
  message?: string;
  onClose: () => void;
  type?: TypeOptions;
}

export function Toast({
  duration = 3000,
  message = '',
  onClose,
  type = 'default',
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  let icon;

  switch (type) {
    case 'error':
      icon = <AlertCircle size={18} className="text-red-400" />;
      break;
    default:
      icon = <CheckCircle size={18} className="text-green-400" />;
      break;
  }

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 animate-fade-in z-[110]">
      <div className="bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
        {icon}
        <span>{message}</span>
      </div>
    </div>
  );
}
