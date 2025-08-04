// components/admin/JobModal.jsx
'use client';

import { useState, useEffect } from 'react';

// Recebemos a lista de lojas como uma 'prop' para popular o dropdown
export default function JobModal({ isOpen, onClose, job, onSave, stores = [] }) {
  const [title, setTitle] = useState('');
  const [lojaId, setLojaId] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [jobCategory, setJobCategory] = useState('Aberta');
  const [isActive, setIsActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (job) {
      setTitle(job.title || '');
      setLojaId(job.loja_id || '');
      setType(job.type || '');
      setDescription(job.description || '');
      setJobCategory(job.job_category || 'Aberta');
      setIsActive(job.is_active);
    } else {
      // Valores padrão para uma nova vaga
      setTitle('');
      setLojaId('');
      setType('Tempo Integral');
      setDescription('');
      setJobCategory('Aberta');
      setIsActive(true);
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const selectedStore = stores.find(s => s.id == lojaId);
    const jobData = {
      title,
      loja_id: lojaId,
      storename: selectedStore ? selectedStore.name : '',
      city: selectedStore ? selectedStore.city : '',
      state: selectedStore ? selectedStore.state : '',
      type,
      description,
      job_category: jobCategory,
      is_active: isActive,
    };
    await onSave(jobData);
    setIsSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">{job ? 'Editar Vaga' : 'Criar Nova Vaga'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Título da Vaga" value={title} onChange={e => setTitle(e.target.value)} required className="p-2 border rounded" />
            <select value={lojaId} onChange={e => setLojaId(e.target.value)} required className="p-2 border rounded bg-white">
              <option value="" disabled>Selecione a Loja</option>
              {stores.map(store => (
                <option key={store.id} value={store.id}>{store.name}</option>
              ))}
            </select>
            <input type="text" placeholder="Tipo (ex: Tempo Integral)" value={type} onChange={e => setType(e.target.value)} required className="p-2 border rounded" />
            <select value={jobCategory} onChange={e => setJobCategory(e.target.value)} required className="p-2 border rounded bg-white">
              <option value="Aberta">Vaga Aberta</option>
              <option value="Banco de Talentos">Banco de Talentos</option>
            </select>
          </div>
          <textarea placeholder="Descrição da Vaga" value={description} onChange={e => setDescription(e.target.value)} rows="4" className="w-full p-2 border rounded mb-4"></textarea>
          <div className="flex items-center justify-between mt-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="h-4 w-4" />
              <span>Vaga Ativa</span>
            </label>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
              <button type="submit" disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300">
                {isSaving ? 'Salvando...' : 'Salvar Vaga'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}