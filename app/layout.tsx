import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "SDIT ANNAJM RABBANI - Sekolah Dasar Islam Terpadu",
  description: "Sekolah Dasar Islam Terpadu yang mengintegrasikan pendidikan akademik dan nilai-nilai Islam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-50">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
