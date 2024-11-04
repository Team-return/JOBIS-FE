"use client";

import ReactQuery from "@/components/reactQuery";
import "./globals.css";
import StyledComponentsRegistry from "../lib/registry";
import { Noto_Sans_KR } from "next/font/google";
import { ReactNode } from "react";
import { ToastProvider } from "@jobis/ui";
import "@jobis/design-token/global.css";
import "@jobis/ui/style.css";
import { Header } from "@/components/header";
import { usePathname } from "next/navigation";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";

ChannelService.loadScript();

const CHATKEY = process.env.NEXT_PUBLIC_CHAT_KEY || "";

ChannelService.boot({
  pluginKey: CHATKEY,
});

const notoSans = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="ko" className={notoSans.className}>
      <body>
        <title>JOBIS</title>
        <ToastProvider>
          <ReactQuery>
            <StyledComponentsRegistry>
              {pathname !== "/" && <Header />}
              {children}
            </StyledComponentsRegistry>
          </ReactQuery>
        </ToastProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
