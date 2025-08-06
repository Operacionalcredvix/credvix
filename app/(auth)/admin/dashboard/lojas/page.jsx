'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../../../lib/supabaseClient';
import StoreModal from '../../../../../components/admin/StoreModal';

// Importar os componentes do shadcn/ui que vamos usar
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function LojasAdminPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

  const fetchStores = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('lojas')
      .select(`*, vagas(count)`)
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
      ({ error } = await supabase.from('lojas').update(storeData).eq('id', editingStore.id));
    } else {
      ({ error } = await supabase.from('lojas').insert([storeData]));
    }

    if (error) {
      alert('Erro ao salvar a loja: ' + error.message);
    } else {
      handleCloseModal();
      await fetchStores();
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
        await fetchStores();
      }
    }
  };

return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end">
        <Button onClick={() => handleOpenModal()}>
          + Criar Nova Loja
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lojas Cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Loja</TableHead>
                <TableHead>Cidade / Estado</TableHead>
                <TableHead>Vagas Vinculadas</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan="4" className="text-center">Carregando lojas...</TableCell></TableRow>
              ) : (
                stores.map(store => (
                  <TableRow key={store.id}>
                    <TableCell className="font-medium">{store.name}</TableCell>
                    <TableCell>{store.city} / {store.state}</TableCell>
                    <TableCell>{store.vagas[0]?.count || 0}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenModal(store)}>Editar</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteStore(store)}>Excluir</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <StoreModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        store={editingStore}
        onSave={handleSaveStore}
      />
    </div>
  );
}
