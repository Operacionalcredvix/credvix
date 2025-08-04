import Link from 'next/link'; // Importa o componente de Link do Next.js
import Image from 'next/image'; // Importa o componente de Imagem otimizada

// Usamos 'export default function' para que possamos importar este componente em outros lugares.
export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Usamos o componente Link para navegação entre páginas, em vez da tag <a> */}
          <Link href="/">
            {/* O componente Image do Next.js otimiza as imagens.
                Precisamos mover as imagens para a pasta 'public'.
                Vamos criar uma pasta 'public/img' e colocar 'Logo Credvix Oficial.png' lá. */}
            <img src="/img/Logo Credvix Oficial.png" alt="Logo Grupo Credvix" className="h-8 md:h-10" />
          </Link>
          <span className="text-gray-300 text-2xl font-light">|</span>
          <Link href="/">
            <img src="/img/logo_help.png" alt="Logo Help!" className="h-8 md:h-10" />
          </Link>
          
          {/* A parte das redes sociais continua a mesma, mas note o 'className' */}
          <div className="flex space-x-4 pl-4">
            <a href="https://www.facebook.com/credvix.oficial/?locale=pt_BR" aria-label="Facebook" className="social-icon">
              {/* SVG continua igual */}
            </a>
            <a href="https://www.instagram.com/credvix/" aria-label="Instagram" className="social-icon">
              {/* SVG continua igual */}
            </a>
            <a href="https://br.linkedin.com/company/credvix" aria-label="LinkedIn" className="social-icon">
              {/* SVG continua igual */}
            </a>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/#quem-somos" className="nav-link">Quem Somos</Link>
          <Link href="/#perguntas" className="nav-link">Perguntas Frequentes</Link>
          <Link href="/lojas" className="nav-link">Lojas</Link>
          <Link href="/vagas" className="nav-link">Trabalhe Conosco</Link>
          <Link href="/admin" className="nav-link">Enxame</Link>
        </div>
      </nav>
    </header>
  );
}