"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const TOAST_DURATION = 4000;

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider duration={TOAST_DURATION}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            className="p-4 pr-8 mt-1"
            key={id}
            {...props}>
            <div className="grid gap-1 justify-items-start">
              {title && <ToastTitle className="text-left">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-left">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
