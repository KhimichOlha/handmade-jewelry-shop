import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Handmade Jewelry Shop",
  description: "Сайт прикрас ручної роботи",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
