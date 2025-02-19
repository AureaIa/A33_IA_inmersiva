export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>AUREA 33 INMERSIVE IA</title>
        <meta name="description" content="La plataforma definitiva de inteligencia artificial" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
import './globals.css';
