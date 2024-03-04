export type ToastType = "success" | "error" | "warning" | "message";

export type ToastPayload = {
  type: ToastType;
  message: string;
};
