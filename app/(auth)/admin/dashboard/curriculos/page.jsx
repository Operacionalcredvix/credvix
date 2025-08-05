// app/admin/dashboard/curriculos/page.jsx
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../../../../lib/supabaseClient';

export default function CurriculosAdminPage() {
  const [resumes, setResumes] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('todos');

  // Função para buscar os currículos, com filtro opcional por cidade
  const fetchResumes = useCallback(async (city) => {
    setLoading(true);
    let query = supabase.from('candidatos').select('*').order('created_at', { ascending: false });

    if (city && city !== 'todos') {
      query = query.eq('city', city);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar currículos:', error);
      alert('Não foi possível carregar os currículos.');
    } else {
      setResumes(data);
    }
    setLoading(false);
  }, []);
  
  // Função para buscar as lojas (para popular o filtro de cidades)
  const fetchStores = useCallback(async () => {
    const { data, error } = await supabase.from('lojas').select('city');
    if (error) {
      console.error('Erro ao buscar cidades das lojas:', error);
    } else {
      setStores(data);
    }
  }, []);

  // Busca os dados iniciais quando a página carrega
  useEffect(() => {
    fetchStores();
    fetchResumes('todos'); // Carrega todos os currículos inicialmente
  }, [fetchStores, fetchResumes]);

  // Gera a lista de cidades únicas para o dropdown
  const availableCities = useMemo(() => {
    const cities = stores.map(store => store.city).filter(Boolean);
    return [...new Set(cities)].sort();
  }, [stores]);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    fetchResumes(city);
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Banco de Currículos</h1>
      </header>
      
      {/* Filtro por Cidade */}
      <section className="mb-6">
        <label htmlFor="city-filter-select" className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por Cidade:
        </label>
        <select 
          id="city-filter-select"
          value={selectedCity}
          onChange={handleCityChange}
          className="w-full max-w-xs p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-white"
        >
          <option value="todos">Todas as Cidades</option>
          {availableCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </section>

      {/* Tabela de Currículos */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Candidato</th>
              <th className="p-4 text-left">Loja da Candidatura</th>
              <th className="p-4 text-left">Data de Envio</th>
              <th className="p-4 text-left">Ação</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="p-4 text-center">Carregando currículos...</td></tr>
            ) : resumes.length === 0 ? (
                <tr><td colSpan="4" className="p-4 text-center">Nenhum currículo encontrado para o filtro selecionado.</td></tr>
            ) : (
              resumes.map(resume => (
                <tr key={resume.id} className="border-b">
                  <td className="p-4">
                    <div className="font-medium">{resume.nome_completo}</div>
                    <div className="text-sm text-gray-500">{resume.email} / {resume.telefone}</div>
                  </td>
                  <td className="p-4">{resume.loja || 'N/A'}</td>
                  <td className="p-4">{new Date(resume.created_at).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4">
                    <a 
                      href={resume.curriculo_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                      Baixar
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}