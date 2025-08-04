// components/admin/StoreModal.jsx
'use client';

import { useState, useEffect } from 'react';

export default function StoreModal({ isOpen, onClose, store, onSave }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Preenche o formulário se estivermos editando uma loja
    if (store) {
      setName(store.name || '');
      setCity(store.city || '');
      setState(store.state || '');
      setAddress(store.address || '');
      setPhone(store.phone || '');
      setWhatsapp(store.whatsapp || '');
      setInstagram(store.instagram_url || '');
    } else {
      // Limpa o formulário se estivermos criando uma nova loja
      setName('');
      setCity('');
      setState('');
      setAddress('');
      setPhone('');
      setWhatsapp('');
      setInstagram('');
    }
  }, [store]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const storeData = { name, city, state, address, phone, whatsapp, instagram_url: instagram };
    await onSave(storeData);
    setIsSaving(false);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">{store ? 'Editar Loja' : 'Criar Nova Loja'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nome da Loja" value={name} onChange={e => setName(e.target.value)} required className="p-2 border rounded"/>
            <input type="text" placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} required className="p-2 border rounded"/>
            <input type="text" placeholder="Estado (ex: ES)" value={state} onChange={e => setState(e.target.value)} required className="p-2 border rounded"/>
            <input type="text" placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} className="p-2 border rounded"/>
            <input type="text" placeholder="Endereço Completo" value={address} onChange={e => setAddress(e.target.value)} className="p-2 border rounded md:col-span-2"/>
            <input type="text" placeholder="Nº de WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="p-2 border rounded"/>
            <input type="text" placeholder="URL do Instagram" value={instagram} onChange={e => setInstagram(e.target.value)} className="p-2 border rounded"/>
          </div>
          <div className="flex justify-end mt-6 space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
            <button type="submit" disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300">
              {isSaving ? 'Salvando...' : 'Salvar Loja'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}