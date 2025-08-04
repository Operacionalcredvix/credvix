import Link from 'next/link';
import styles from './Footer.module.css'; // Importa os estilos do módulo

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // A classe `styles.footer` vem do nosso módulo, o resto vem do Tailwind
    <footer className={`${styles.footer} text-white pt-16 pb-8`}>
      <div className="container mx-auto px-6">
        {/* Este grid depende do Tailwind para funcionar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4 space-x-2">
              <span className={styles.brandText}>Credvix</span>
              <span className="text-gray-500">|</span>
              <span className={styles.brandText}>Help!</span>
            </div>
            <p className={styles.description}>
              Há 13 anos oferecendo as melhores soluções em crédito consignado para servidores públicos,
              aposentados e pensionistas em todo o Brasil.
            </p>
            <div className={styles.socialIconsContainer}>
              <a href="https://www.facebook.com/credvix.oficial/?locale=pt_BR" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg>
              </a>
              <a href="https://www.instagram.com/credvix/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg>
              </a>
              <a href="https://br.linkedin.com/company/credvix" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
              </a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className={styles.heading}>Links Rápidos</h3>
            <ul className={styles.quickLinksList}>
              <li><Link href="/#quem-somos">Quem Somos</Link></li>
              <li><Link href="/#perguntasFrequentes">Perguntas Frequentes</Link></li>
              <li><Link href="/lojas">Nossas Lojas</Link></li>
              <li><Link href="/vagas">Trabalhe Conosco</Link></li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h3 className={styles.heading}>Contato</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={`${styles.contactIcon} material-icons`}>location_on</span>
                <span>Presente em 6 Estados do Brasil</span>
              </li>
              <li className={`${styles.contactItem} items-center`}>
                <span className={`${styles.contactIcon} material-icons`}>email</span>
                <a href="mailto:contato@credvix.com" className="hover:text-white transition-colors">contato@credvix.com</a>
              </li>
              <li className={`${styles.contactItem} items-center`}>
                <span className={`${styles.contactIcon} material-icons`}>call</span>
                <a href="tel:+552730208584" className="hover:text-white transition-colors">(27) 3020-8584</a>
              </li>
              <li className={styles.contactItem}>
                <span className={`${styles.contactIcon} material-icons`}>schedule</span>
                <span>Matriz: Segunda a Sexta, 9h às 18h<br /><span className="text-xs text-gray-500">Demais lojas seguem o horário local.</span></span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.divider}>
          <div className={styles.copyrightText}>
            <p className="mb-2">&copy; {currentYear} Credvix. Todos os direitos reservados. Operando como franqueada oficial da Help! BMG.</p>
            <p>O crédito consignado está sujeito à análise e aprovação. As condições apresentadas podem variar conforme o convênio e a margem consignável disponível. Consulte sempre as condições específicas antes da contratação. Help! é uma marca registrada do Banco BMG S.A.</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm mb-3">Uma empresa do</p>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/img/apis.png" alt="Logo Apis Grupo" className="h-12 mx-auto" />
          </a>
        </div>
      </div>
    </footer>
  );
}