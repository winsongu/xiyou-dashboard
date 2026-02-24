import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import LayoutShell from "@/components/layout/LayoutShell";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "西游编队 | AI Agent 内容生产指挥部",
  description:
    "8 位 AI Agent 组成的西游取经团队，7×24 自动化内容生产 Dashboard。Powered by OpenClaw。",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐵</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=LXGW+WenKai:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
