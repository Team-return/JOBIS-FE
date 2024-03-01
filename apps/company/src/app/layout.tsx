"use client";

import ReactQuery from "@/components/ReactQuery";
import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";
import { Noto_Sans_KR } from "next/font/google";
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { usePathname } from "next/navigation";
import "@jobis/design-token/global.css";
import "@jobis/ui/style.css";

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
        <ReactQuery>
          <StyledComponentsRegistry>
            {/* {pathname !== "/" && pathname !== "/registration" && <Header />} */}
            {children}
          </StyledComponentsRegistry>
        </ReactQuery>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
