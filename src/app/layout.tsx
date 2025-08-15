import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";  // ← Agregar esta línea

export const metadata = {
  title: "Transfer Compliance OS",
  description: "Sistema de verificación de cumplimiento de transferencias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
