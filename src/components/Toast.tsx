import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 animate-fade-in">
      <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
        <CheckCircle size={18} className="text-green-400" />
        <span>{message}</span>
      </div>
    </div>
  );
}