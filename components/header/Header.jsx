import Link from 'next/link';
import styles from './Header.module.css'; // Importa o nosso módulo de estilos completo

export default function Header() {
  return (
    // A estilização de fundo e sombra ainda pode vir do Tailwind ou ser movida para o módulo
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className={styles.navContainer}>
        
        {/* Lado Esquerdo: Logos e Ícones Sociais */}
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logoCredivix}>
            Credvix
          </Link>
          <span className="text-gray-300 text-2xl font-light">|</span>
          <Link href="/" className={styles.logoHelp}>
            Help!
          </Link>
          
          <div className={styles.socialIconsContainer}>
            <a href="https://www.facebook.com/credvix.oficial/?locale=pt_BR" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg>
            </a>
            <a href="https://www.instagram.com/credvix/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07..." /></svg>
            </a>
            <a href="https://br.linkedin.com/company/credvix" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
            </a>
          </div>
        </div>
        
        {/* Lado Direito: Links de Navegação */}
        <div className={styles.rightSection}>
          <Link href="/#quem-somos" className={styles.navLink}>Quem Somos</Link>
          <Link href="/#perguntas" className={styles.navLink}>Perguntas Frequentes</Link>
          <Link href="/lojas" className={styles.navLink}>Lojas</Link>
          <Link href="/vagas" className={styles.navLink}>Trabalhe Conosco</Link>
          <Link href="/admin" className={styles.navLink}>Enxame</Link>
        </div>
      </nav>
    </header>
  );
}