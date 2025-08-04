// app/admin/dashboard/layout.jsx
'use client';

import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin'); // Redireciona para a página de login após o logout
  };

  return (
    <div id="dashboard" className="flex h-screen">
      <aside className="sidebar w-64 bg-gray-800 text-white flex flex-col p-4 flex-shrink-0">
        <div className="sidebar-header text-center mb-8">
          <img src="/img/favicon.png" alt="Logo" className="sidebar-logo w-12 mx-auto mb-2" />
          <h3 className="font-bold text-lg">Credvix Admin</h3>
        </div>
        <nav>
          <ul id="main-nav" className="space-y-2">
            {/* Adicione a lógica de 'active' com base na rota atual posteriormente */}
            <li><Link href="/admin/dashboard" className="flex items-center p-3 rounded-lg hover:bg-gray-700"><span className="material-icons mr-3">work</span> Vagas</Link></li>
            <li><Link href="/admin/dashboard/curriculos" className="flex items-center p-3 rounded-lg hover:bg-gray-700"><span className="material-icons mr-3">folder_shared</span> Currículos</Link></li>
            <li><Link href="/admin/dashboard/lojas" className="flex items-center p-3 rounded-lg hover:bg-gray-700"><span className="material-icons mr-3">store</span> Lojas</Link></li>
          </ul>
        </nav>
        <div className="sidebar-footer mt-auto">
          <button onClick={handleLogout} className="w-full flex items-center justify-center bg-red-600 p-2 rounded-lg hover:bg-red-700">
            <span className="material-icons mr-2">logout</span> Sair
          </button>
        </div>
      </aside>

      <main className="main-content flex-grow p-8 overflow-y-auto bg-gray-100">
        {children} {/* O conteúdo da página específica será renderizado aqui */}
      </main>
    </div>
  );
}