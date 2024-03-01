"use client";

import ReactQuery from "@/components/reactQuery";
import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";
import { Noto_Sans_KR } from "next/font/google";
import { ReactNode } from "react";
import "@jobis/design-token/global.css";
import "@jobis/ui/style.css";

const notoSans = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={notoSans.className}>
      <body>
        <title>JOBIS</title>
        <ReactQuery>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ReactQuery>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
