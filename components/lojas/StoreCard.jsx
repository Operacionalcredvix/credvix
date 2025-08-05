import Link from 'next/link';
import styles from './StoreCard.module.css';
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaInstagram } from 'react-icons/fa';

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
            {/* 2. Substituir o <span> pelo componente do ícone */}
            <FaMapMarkerAlt className={styles.detailIcon} />
            <span>{store.address || 'Endereço não informado'}</span>
          </div>
          <div className={`${styles.detailItem} items-center`}>
            <FaPhone className={styles.detailIcon} />
            <span className="font-semibold">{store.phone || 'Telefone não informado'}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.actions}>
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" title="Contatar no WhatsApp" className={styles.whatsappButton}>
              <FaWhatsapp size="1.2em" /> {/* Usamos o componente do ícone */}
              <span>WhatsApp</span>
            </Link>
            <Link href={instagramLink} target="_blank" rel="noopener noreferrer" title="Visitar Instagram" className={styles.instagramButton}>
              <FaInstagram size="1.5em" color="white" /> {/* Usamos o componente do ícone */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}