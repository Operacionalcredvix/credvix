import './globals.css'; // Importa o CSS global
import Header from '../app/components/Header'; // Importa nosso novo Header
import Footer from '@/app/components/Footer'; // Importa nosso novo Footer

// 'metadata' é usado para o <head> do HTML (SEO)
export const metadata = {
  title: 'Credvix & Help! - Crédito Consignado',
  description: 'Há 13 anos oferecendo as melhores soluções em crédito consignado...',
};

// Este é o componente de Layout. Ele "envolve" todas as suas páginas.
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header /> {/* Nosso componente Header aqui! */}
        <main>
          {children} {/* Aqui é onde o conteúdo da página específica será renderizado */}
        </main>
        <Footer /> {/* Nosso componente Footer aqui! */}
      </body>
    </html>
  );
}