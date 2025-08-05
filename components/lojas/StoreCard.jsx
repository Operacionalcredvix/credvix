import Link from 'next/link';
import styles from './StoreCard.module.css';

export default function StoreCard({ store }) {
  const whatsappNumber = store.whatsapp ? store.whatsapp.replace(/\D/g, '') : '';
  const whatsappMessage = encodeURIComponent(`Oi, encontrei a loja ${store.name} pelo site e gostaria de mais informações!`);
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}` : '#';
  const instagramLink = store.instagram_url || '#';

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.storeName}>{store.name}</h3>
          <span className={styles.stateBadge}>{store.state}</span>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={`${styles.detailIcon} material-icons`}>location_on</span>
            <span>{store.address || 'Endereço não informado'}</span>
          </div>
          <div className={`${styles.detailItem} items-center`}>
            <span className={`${styles.detailIcon} material-icons`}>call</span>
            <span className="font-semibold">{store.phone || 'Telefone não informado'}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.actions}>
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" title="Contatar no WhatsApp" className={styles.whatsappButton}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.651 4.383 1.803 6.151l-1.217 4.439 4.562-1.192zM12.07 9.15c-.244-.123-1.448-.714-1.674-.795-.225-.082-.39-.123-.554.124-.165.246-.633.795-.776.959-.143.164-.287.185-.531.062-.244-.123-.488-.185-1.032-.617-.544-.432-.902-1.02-1.02-1.184-.118-.164-.025-.246.082-.369.082-.102.185-.267.287-.432.102-.164.143-.287.205-.471.062-.185.021-.349-.041-.471-.062-.123-.554-1.329-.757-1.826-.205-.496-.41-.432-.554-.432-.143 0-.307-.021-.471-.021-.164 0-.432.062-.657.328-.225.267-.862.84-.862 2.046 0 1.206.883 2.372 1.005 2.536.123.164 1.738 2.66 4.205 3.72.596.246 1.054.389 1.416.51.544.185.962.164 1.325.102.41-.062 1.448-.592 1.651-1.164.205-.572.205-1.054.143-1.164-.062-.102-.225-.164-.471-.287z"/></svg>
              <span>WhatsApp</span>
            </Link>
            <Link href={instagramLink} target="_blank" rel="noopener noreferrer" title="Visitar Instagram" className={styles.instagramButton}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}