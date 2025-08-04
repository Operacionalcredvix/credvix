// components/StoreList.jsx
'use client'; // Componente de Cliente para interatividade

import { useState, useMemo } from 'react';
import StoreCard from './StoreCard';

export default function StoreList({ stores }) {
  // Estados para controlar os valores dos filtros
  const [stateFilter, setStateFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Gera a lista de estados únicos para o dropdown de filtro
  const availableStates = useMemo(() => {
    // [...new Set()] cria um array com valores únicos
    return [...new Set(stores.map(store => store.state))].sort();
  }, [stores]);

  // Filtra as lojas com base nos estados dos filtros
  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      const matchesState = stateFilter === 'todos' || store.state === stateFilter;
      const lowerCaseSearch = searchTerm.toLowerCase();
      const matchesSearch = store.name.toLowerCase().includes(lowerCaseSearch) || 
                            (store.city && store.city.toLowerCase().includes(lowerCaseSearch));
      return matchesState && matchesSearch;
    });
  }, [stores, stateFilter, searchTerm]);

  return (
    <section id="encontre" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">Busque por sua cidade ou estado</h2>
          <p className="section-subtitle">Estamos presentes em todo o Brasil. Encontre a unidade mais próxima de você e fale com nossos especialistas.</p>
        </div>

        {/* --- Filtros --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <div>
            <label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Estado:</label>
            <select
              id="state-select"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 ring-help-purple"
              value={stateFilter} // Controlado pelo estado do React
              onChange={(e) => setStateFilter(e.target.value)} // Atualiza o estado quando o valor muda
            >
              <option value="todos">Todos os Estados</option>
              {availableStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-2">Buscar por cidade ou nome:</label>
            <div className="relative">
              <input
                type="text"
                id="search-input"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 ring-help-purple"
                placeholder="Digite para buscar..."
                value={searchTerm} // Controlado pelo estado do React
                onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado quando o valor muda
              />
            </div>
          </div>
        </div>

        {/* --- Grid de Lojas --- */}
        {filteredStores.length > 0 ? (
          <div id="store-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStores.map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <div id="no-stores-message" className="text-center text-gray-500 mt-8">
            <p>Nenhuma loja encontrada para a sua busca.</p>
          </div>
        )}
      </div>
    </section>
  );
}