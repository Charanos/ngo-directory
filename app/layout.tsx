import "./globals.css";
import type { Metadata } from "next";
import "easymde/dist/easymde.min.css";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const nunito = localFont({
  src: "./fonts/Nunito-VariableFont_wght.ttf",
  variable: "--font-nunito",
  weight: "100 500 900",
});
const montserrat = localFont({
  src: "./fonts/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  weight: "100 500 900",
});

export const metadata: Metadata = {
  title: "Kenyan NGOs Directory",
  description: "A database of Kenyan NGOs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${montserrat.variable} antialiased font-nunito`}
      >
        <Navbar />
        {children}

        <Toaster />
      </body>
    </html>
  );
}
