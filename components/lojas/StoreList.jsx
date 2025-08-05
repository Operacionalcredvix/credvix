'use client';

import { useState, useMemo } from 'react';
import StoreCard from './StoreCard';
import styles from './StoreList.module.css';

export default function StoreList({ stores }) {
  const [stateFilter, setStateFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const availableStates = useMemo(() => {
    return [...new Set(stores.map(store => store.state))].sort();
  }, [stores]);

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
    <section id="encontre" className={styles.filtersSection}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">Busque por sua cidade ou estado</h2>
          <p className="section-subtitle">Estamos presentes em todo o Brasil. Encontre a unidade mais próxima de você e fale com nossos especialistas.</p>
        </div>

        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <label htmlFor="state-select">Filtrar por Estado:</label>
            <select
              id="state-select"
              className={styles.filterSelect}
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="todos">Todos os Estados</option>
              {availableStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="search-input">Buscar por cidade ou nome:</label>
            <input
              type="text"
              id="search-input"
              className={styles.filterInput}
              placeholder="Digite para buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredStores.length > 0 ? (
          <div className={styles.storeGrid}>
            {filteredStores.map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p>Nenhuma loja encontrada para a sua busca.</p>
          </div>
        )}
      </div>
    </section>
  );
}