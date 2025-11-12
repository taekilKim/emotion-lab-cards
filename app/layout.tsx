import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "감정 실험 카드",
  description: "하루 한 번, 나를 관찰하는 감정 실험",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
