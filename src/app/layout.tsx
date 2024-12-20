import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/general/Footer";

export const metadata: Metadata = {
  title: "GPT Theme",
  description: "自由研究課題提案サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div>
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
