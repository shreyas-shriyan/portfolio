import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shreyas's Portfolio",
  description: "Portfolio of shreyas shriyan",
  verification: {
    google: "2Iu1tkhS3SKcnxlV7fDs7U9hAQIcVRXZyglT-fEoZgE",
  },
  openGraph: {
    images: 'https://avatars.githubusercontent.com/u/51715896?v=4?s=400',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
