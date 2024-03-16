import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "app/globals.css";
import { Providers } from "app/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3 Transaction List",
  description: "Transaction list powered by EtherScan and Polygonscan",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
