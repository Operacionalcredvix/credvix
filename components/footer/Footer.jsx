import Link from 'next/link';
import styles from './Footer.module.css';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          
          <div className={styles.logoColumn}>
            <div className="flex items-center mb-4 space-x-2">
              <span className={styles.brandText}>Credvix</span>
              <span className="text-gray-500">|</span>
              <span className={styles.brandText}>Help!</span>
            </div>
            <p className={styles.description}>
              Há 13 anos oferecendo as melhores soluções em crédito consignado para servidores públicos, aposentados e pensionistas em todo o Brasil.
            </p>
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

          <div>
            <h3 className={styles.heading}>Links Rápidos</h3>
            <ul className={styles.quickLinksList}>
              <Link href="/#quem-somos">Quem Somos</Link>
              <Link href="/#perguntasFrequentes">Perguntas Frequentes</Link>
              <Link href="/lojas">Nossas Lojas</Link>
              <Link href="/vagas">Trabalhe Conosco</Link>
            </ul>
          </div>

          <div className={styles.contactColumn}>
            <h3 className={styles.heading}>Contato</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                {/* 2. Substituir o <span> pelo componente do ícone */}
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>Presente em 6 Estados do Brasil</span>
              </li>
              <li className={`${styles.contactItem} items-center`}>
                <FaEnvelope className={styles.contactIcon} />
                <a href="mailto:contato@credvix.com" className="hover:text-white transition-colors">contato@credvix.com</a>
              </li>
              <li className={`${styles.contactItem} items-center`}>
                <FaPhone className={styles.contactIcon} />
                <a href="tel:+552730208584" className="hover:text-white transition-colors">(27) 3020-8584</a>
              </li>
              <li className={styles.contactItem}>
                <FaClock className={styles.contactIcon} />
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

        <div className={styles.apisSection}>
          <p className="text-gray-400 text-sm mb-3">Uma empresa do</p>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/img/apis.png" alt="Logo Apis Grupo" className={styles.apisLogo} />
          </a>
        </div>
      </div>
    </footer>
  );
}