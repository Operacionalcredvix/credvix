'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import JobModal from '../../../../components/admin/JobModal';
import StatCard from '../../../../components/admin/StatCard'; // Importa o nosso novo StatCard

// Importar os ícones que vamos usar
import { Briefcase, CheckCircle2, XCircle } from 'lucide-react';

// Importar os componentes do shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function VagasAdminPage() {
  const [jobs, setJobs] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    inactiveJobs: 0,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    
    const [jobsResponse, storesResponse] = await Promise.all([
      supabase.from('vagas').select(`*, lojas(name, city, state), candidatos(count)`).order('created_at', { ascending: false }),
      supabase.from('lojas').select('*').order('name')
    ]);

    if (jobsResponse.data) {
      const allJobs = jobsResponse.data;
      setJobs(allJobs);
      setStats({
        totalJobs: allJobs.length,
        activeJobs: allJobs.filter(j => j.is_active).length,
        inactiveJobs: allJobs.filter(j => !j.is_active).length,
      });
    }
    
    if (storesResponse.data) {
      setStores(storesResponse.data);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // As suas outras funções (handleOpenModal, handleCloseModal, etc.) continuam iguais
  const handleOpenModal = (job = null) => { setIsModalOpen(true); setEditingJob(job); };
  const handleCloseModal = () => { setIsModalOpen(false); setEditingJob(null); };
  const handleSaveJob = async (jobData) => { /* ...código existente... */ await fetchData(); };
  const handleDeleteJob = async (job) => { /* ...código existente... */ await fetchData(); };

  return (
    <div className="flex flex-col gap-8">
      {/* Grelha para os cartões de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total de Vagas" value={loading ? '...' : stats.totalJobs} icon={Briefcase} />
        <StatCard title="Vagas Ativas" value={loading ? '...' : stats.activeJobs} icon={CheckCircle2} />
        <StatCard title="Vagas Inativas" value={loading ? '...' : stats.inactiveJobs} icon={XCircle} />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline"> + Adicionar ao Banco de Talentos</Button>
        <Button onClick={() => handleOpenModal()}>+ Criar Nova Vaga</Button>
      </div>

      <Card>
        {/* A sua tabela de vagas continua aqui, sem alterações */}
        <CardHeader>
          <CardTitle>Vagas Publicadas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título da Vaga</TableHead>
                <TableHead>Loja</TableHead>
                <TableHead>Candidatos</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan="5" className="text-center">Carregando vagas...</TableCell></TableRow>
              ) : (
                jobs.map(job => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.lojas ? job.lojas.name : 'N/A'}</TableCell>
                    <TableCell>{job.candidatos[0]?.count || 0}</TableCell>
                    <TableCell>
                      <Badge variant={job.is_active ? "default" : "destructive"}>
                        {job.is_active ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenModal(job)}>Editar</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteJob(job)}>Excluir</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
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