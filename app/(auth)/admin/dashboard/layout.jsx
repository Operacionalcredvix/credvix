'use client';

import { supabase } from '../../../../lib/supabaseClient';
import { useRouter, usePathname } from 'next/navigation'; // Importa o usePathname
import Link from 'next/link';
import { FiBriefcase, FiFileText, FiHome, FiLogOut } from 'react-icons/fi';
import styles from './DashboardLayout.module.css'; // Importa os nossos novos estilos

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // Hook para obter o URL atual

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  // Função para verificar se o link está ativo
  const isActive = (href) => pathname === href;

  return (
    <div className={styles.dashboardLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
            <Link href="/" className={styles.sidebarLogoLink}>
                <img src="/img/favicon.png" alt="Logo" className="h-6 w-6" />
                <span>Credvix Admin</span>
            </Link>
        </div>
        <nav className={styles.sidebarNav}>
          <Link 
            href="/admin/dashboard" 
            className={`${styles.navLink} ${isActive('/admin/dashboard') ? styles.navLinkActive : ''}`}
          >
            <FiBriefcase className="h-4 w-4" /> Vagas
          </Link>
          <Link 
            href="/admin/dashboard/curriculos" 
            className={`${styles.navLink} ${isActive('/admin/dashboard/curriculos') ? styles.navLinkActive : ''}`}
          >
            <FiFileText className="h-4 w-4" /> Currículos
          </Link>
          <Link 
            href="/admin/dashboard/lojas" 
            className={`${styles.navLink} ${isActive('/admin/dashboard/lojas') ? styles.navLinkActive : ''}`}
          >
            <FiHome className="h-4 w-4" /> Lojas
          </Link>
        </nav>
        <div className={styles.sidebarFooter}>
             <button onClick={handleLogout} className={styles.logoutButton}>
                <FiLogOut className="h-4 w-4" /> Sair
             </button>
        </div>
      </aside>
      <div className={styles.contentWrapper}>
        {/* O Navbar que criámos anteriormente já não é necessário aqui,
            pois o título já está na página. Se quiser, podemos adicioná-lo de volta. */}
        <main className={styles.mainContent}>
            {children}
        </main>
      </div>
    </div>
  );
}