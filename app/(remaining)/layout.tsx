import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import Provider from "../Providers";
import Navbar from "../Components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description:
    "This is a todo web made by Animesh Acharya while learning NextJS. ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
