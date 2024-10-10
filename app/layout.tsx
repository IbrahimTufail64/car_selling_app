import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Alexandria} from '@next/font/google'

const alexandria = Alexandria({
  subsets: [],
  weight:['100','200','300','400','500','600','700','900'],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const geistAlexandria = localFont({
  src: "./fonts/Alexandria.ttf",
  variable: "--font-geist-alex",
  weight: "100 200 300 400 500 600 700 900",
});


export const metadata: Metadata = {
  title: "Carsmart",
  description: "carsmart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={alexandria.className}
      >
        {children}
      </body>
    </html>
  );
}
