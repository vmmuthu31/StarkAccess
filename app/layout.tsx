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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" /> {/* Add your favicon here */}
      </head>
      <body>{children}</body>
    </html>
  );
}
