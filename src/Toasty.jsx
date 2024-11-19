import React, { useState, useEffect, createContext, useContext } from "react";

const Toast = ({ emoji, message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [duration, onClose]);

  return (
    <div className="toasted">
      <span className="burnt">{emoji}</span>
      <span>{message}</span>
    </div>
  );
};


const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (emoji, message, duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, emoji, message, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }} className="toastedList">
      {children}
      <div className="toastedList">
        {toasts.map((toast) => (
            <Toast
            key={toast.id}
            emoji={toast.emoji}
            message={toast.message}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
            />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
