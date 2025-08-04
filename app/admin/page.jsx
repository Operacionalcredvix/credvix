// app/admin/page.jsx
'use client'; // Esta página precisa de interatividade (formulário, estado)

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Efeito para verificar se o usuário já está logado
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/admin/dashboard'); // Se já estiver logado, redireciona para o painel
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError('E-mail ou senha inválidos.');
    } else {
      router.push('/admin/dashboard'); // Redireciona após login bem-sucedido
    }
  };
  
  // Mostra uma tela de carregamento enquanto verifica a sessão
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  return (
    <div id="login-container" className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <img src="/img/favicon.png" alt="Logo Credvix" className="logo h-16 w-16 mb-4" />
      <h2 className="text-2xl font-bold mb-6">Acesso ao Painel Vagas Credvix</h2>
      <form id="login-form" onSubmit={handleLogin} className="w-full max-w-xs">
        <input
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          id="password"
          placeholder="Digite sua senha"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700">
          Entrar
        </button>
      </form>
      {error && <p id="login-error" className="error-message text-red-500 mt-4">{error}</p>}
    </div>
  );
}