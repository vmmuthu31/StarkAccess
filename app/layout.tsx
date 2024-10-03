import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StarkAccess",
  description: "Experience Seamless Connections at Your Events with Starknet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
        {children}
      </body>
    </html>
  );
}
