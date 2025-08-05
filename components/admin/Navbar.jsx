'use client';

import { usePathname } from 'next/navigation';

// Um mapeamento simples para os títulos das páginas
const titleMap = {
  '/admin/dashboard': 'Gestão de Vagas',
  '/admin/dashboard/curriculos': 'Banco de Currículos',
  '/admin/dashboard/lojas': 'Gestão de Lojas',
};

export default function Navbar() {
  const pathname = usePathname();
  const title = titleMap[pathname] || 'Dashboard';

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      {/* Aqui podemos adicionar outros elementos no futuro, como um campo de busca ou um menu de utilizador */}
    </header>
  );
}