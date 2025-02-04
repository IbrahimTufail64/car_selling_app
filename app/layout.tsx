import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Alexandria} from '@next/font/google'
import { AppWrapper } from "./Context";

const alexandria = Alexandria({
  subsets: ['latin'],
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
  description: "carsmart PWA",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  viewport:
    "width=device-width, initial-scale=1.6, minimum-scale=1, shrink-to-fit=no, user-scalable=no",
  icons: [
    { rel: "apple-touch-icon", url: "icons/Logo-128.png" },
    { rel: "icon", url: "icons/Logo-128x128.png" },
  ],
  // themeColor: "transparent",
  // appleWebApp: {
  //   capable: true,
  //   statusBarStyle: "default",
  //   title: "Carsmart",
  // },
};
//  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"></meta> 
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
        <AppWrapper>
           {children}
        </AppWrapper>
      </body>
    </html>
  );
}
