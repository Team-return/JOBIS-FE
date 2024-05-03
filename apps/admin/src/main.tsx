import * as ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalStyle } from "@/themes/globalStyle.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastProvider } from "@jobis/ui";
import { Toaster } from "react-hot-toast";
import "@/themes/fonts.css";
import "@jobis/design-token/global.css";
import "@jobis/ui/style.css";
import { BrowserRouter } from "react-router-dom";
import { Modal, ModalContextProvider } from "@/components";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      staleTime: 60_000,
      retry: 2,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ModalContextProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Toaster />
          <Modal />
          <GlobalStyle />
          <App />
          <ReactQueryDevtools />
        </ToastProvider>
      </QueryClientProvider>
    </ModalContextProvider>
  </BrowserRouter>
);
