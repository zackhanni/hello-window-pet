import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { UserDataProvider } from "@/contexts/UserDataContext";
import { sourceSans } from "./fonts";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hello Window Pet",
  description: "See and share images of window pets",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <UserDataProvider session={session}>
          <body
            className={`${sourceSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navigation session={session} />
            {children}
            <Footer />
          </body>
        </UserDataProvider>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
