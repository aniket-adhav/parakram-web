import { useContext } from "react";
import { ToastContext } from "@/components/providers/ToastProvider";

export const useAppToast = () => {
  const toast = useContext(ToastContext);
  if (!toast) {
    throw new Error("useAppToast must be used inside ToastProvider");
  }
  return toast;
};
