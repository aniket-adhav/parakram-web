"use client";

import { createContext } from "react";
import { motion } from "framer-motion";
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

export const ToastContext = createContext(null);

export default function ToastProvider({ children }) {
  const show = ({
    title,
    message,
    variant = "default",
    duration = 4000,
    position = "bottom-right",
  }) => {
    const icons = {
      success: CheckCircle,
      error: AlertCircle,
      warning: AlertTriangle,
      default: Info,
    };

    const Icon = icons[variant];

    const iconColor = {
      success: "text-green-600",
      error: "text-red-600",
      warning: "text-yellow-600",
      default: "text-gray-600",
    };

    sonnerToast.custom(
      (id) => (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="flex items-center justify-between gap-3
                     w-full max-w-sm p-4 rounded-xl
                     bg-white border border-gray-200
                     shadow-xl"
        >
          <div className="flex items-start gap-3">
            <Icon className={`w-5 h-5 mt-0.5 ${iconColor[variant]}`} />

            <div>
              {title && (
                <p className="text-sm font-semibold text-gray-900">
                  {title}
                </p>
              )}
              <p className="text-sm text-gray-600">
                {message}
              </p>
            </div>
          </div>

          <button
            onClick={() => sonnerToast.dismiss(id)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </motion.div>
      ),
      { duration, position }
    );
  };

  return (
    <ToastContext.Provider value={{ show }}>
      <SonnerToaster position="bottom-right" />
      {children}
    </ToastContext.Provider>
  );
}
