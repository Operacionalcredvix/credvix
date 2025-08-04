// app/admin/dashboard/page.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import JobModal from '../../../components/admin/JobModal';

export default function VagasAdminPage() {
  const [jobs, setJobs] = useState([]);
  const [stores, setStores] = useState([]); // Precisamos das lojas para o dropdown do modal
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    // Busca vagas e lojas em paralelo para mais eficiência
    const [jobsResponse, storesResponse] = await Promise.all([
      supabase.from('vagas').select(`*, lojas(name, city, state), candidatos(count)`).order('created_at', { ascending: false }),
      supabase.from('lojas').select('*').order('name')
    ]);

    if (jobsResponse.error) console.error('Erro ao buscar vagas:', jobsResponse.error);
    else setJobs(jobsResponse.data);

    if (storesResponse.error) console.error('Erro ao buscar lojas:', storesResponse.error);
    else setStores(storesResponse.data);

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = (job = null) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const handleSaveJob = async (jobData) => {
    let error;
    if (editingJob) {
      ({ error } = await supabase.from('vagas').update(jobData).eq('id', editingJob.id));
    } else {
      ({ error } = await supabase.from('vagas').insert([jobData]));
    }

    if (error) {
      alert('Erro ao salvar a vaga: ' + error.message);
    } else {
      handleCloseModal();
      await fetchData();
    }
  };
  
  const handleDeleteJob = async (job) => {
    const candidateCount = job.candidatos[0]?.count || 0;
    if (candidateCount > 0) {
        alert(`Não é possível excluir esta vaga, pois ela possui ${candidateCount} candidatura(s).`);
        return;
    }
      
    if (window.confirm(`Tem certeza que deseja excluir a vaga "${job.title}"?`)) {
      const { error } = await supabase.from('vagas').delete().eq('id', job.id);
      if (error) {
        alert('Erro ao excluir a vaga: ' + error.message);
      } else {
        await fetchData();
      }
    }
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestão de Vagas</h1>
        <button onClick={() => handleOpenModal()} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
          + Criar Nova Vaga
        </button>
      </header>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Título da Vaga</th>
              <th className="p-4 text-left">Loja</th>
              <th className="p-4 text-left">Candidatos</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-4 text-center">Carregando vagas...</td></tr>
            ) : (
              jobs.map(job => (
                <tr key={job.id} className="border-b">
                  <td className="p-4 font-medium">{job.title}</td>
                  <td className="p-4">{job.lojas ? job.lojas.name : 'N/A'}</td>
                  <td className="p-4">{job.candidatos[0]?.count || 0}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${job.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {job.is_active ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    <button onClick={() => handleOpenModal(job)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
                    <button onClick={() => handleDeleteJob(job)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Excluir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <JobModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        job={editingJob}
        onSave={handleSaveJob}
        stores={stores}
      />
    </div>
  );
}