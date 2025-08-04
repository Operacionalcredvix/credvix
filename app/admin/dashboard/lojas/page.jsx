// app/admin/dashboard/lojas/page.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import StoreModal from '../../../../components/admin/StoreModal';

export default function LojasAdminPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

  const fetchStores = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('lojas')
      .select(`*, vagas(count)`) // Pega a contagem de vagas relacionadas
      .order('name', { ascending: true });
      
    if (error) {
      console.error('Erro ao buscar lojas:', error);
    } else {
      setStores(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const handleOpenModal = (store = null) => {
    setEditingStore(store);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStore(null);
  };

  const handleSaveStore = async (storeData) => {
    let error;
    if (editingStore) {
      // Atualizar loja existente
      ({ error } = await supabase.from('lojas').update(storeData).eq('id', editingStore.id));
    } else {
      // Criar nova loja
      ({ error } = await supabase.from('lojas').insert([storeData]));
    }

    if (error) {
      alert('Erro ao salvar a loja: ' + error.message);
    } else {
      handleCloseModal();
      await fetchStores(); // Atualiza a lista de lojas
    }
  };
  
  const handleDeleteStore = async (store) => {
    const vagaCount = store.vagas[0]?.count || 0;
    if (vagaCount > 0) {
      alert(`Não é possível excluir esta loja, pois ela possui ${vagaCount} vaga(s) associada(s).`);
      return;
    }

    if (window.confirm(`Tem certeza que deseja excluir a loja "${store.name}"?`)) {
      const { error } = await supabase.from('lojas').delete().eq('id', store.id);
      if (error) {
        alert('Erro ao excluir a loja: ' + error.message);
      } else {
        await fetchStores(); // Atualiza a lista de lojas
      }
    }
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestão de Lojas</h1>
        <button onClick={() => handleOpenModal()} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
          + Criar Nova Loja
        </button>
      </header>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Nome da Loja</th>
              <th className="p-4 text-left">Cidade / Estado</th>
              <th className="p-4 text-left">Vagas Vinculadas</th>
              <th className="p-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="p-4 text-center">Carregando lojas...</td></tr>
            ) : (
              stores.map(store => (
                <tr key={store.id} className="border-b">
                  <td className="p-4 font-medium">{store.name}</td>
                  <td className="p-4">{store.city} / {store.state}</td>
                  <td className="p-4">{store.vagas[0]?.count || 0}</td>
                  <td className="p-4 space-x-2">
                    <button onClick={() => handleOpenModal(store)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
                    <button onClick={() => handleDeleteStore(store)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Excluir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <StoreModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        store={editingStore}
        onSave={handleSaveStore}
      />
    </div>
  );
}