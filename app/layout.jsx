import './globals.css';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

export const metadata = {
  title: 'Credvix & Help! - Crédito Consignado',
  description: 'Há 13 anos oferecendo as melhores soluções em crédito consignado...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}