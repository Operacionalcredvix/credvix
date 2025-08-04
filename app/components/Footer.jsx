
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Lógica de JS direto no componente!

  return (
    <footer className="footer-bg text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
                {/* ... (todo o conteúdo do seu footerHTML aqui, lembre-se de trocar 'class' por 'className') ... */}
            </div>
            <div className="border-t border-gray-700 pt-6 mt-6 text-center text-gray-500 text-sm">
                <p className="mb-2">&copy; <span id="year">{currentYear}</span> Credvix. Todos os direitos reservados. Operando como franqueada oficial da Help! BMG.</p>
                {/* ... (resto do texto) ... */}
            </div>
            {/* ... (resto do footer) ... */}
        </div>
    </footer>
  );
}