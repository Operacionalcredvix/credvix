'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import JobModal from '../../../../components/admin/JobModal';
import StatCard from '../../../../components/admin/StatCard';
import JobCardAdmin from '../../../../components/admin/JobCardAdmin';

// Importar os ícones
import { Briefcase, CheckCircle2, XCircle } from 'lucide-react';

// Importar os componentes do shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function VagasAdminPage() {
  const [allJobs, setAllJobs] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // 1. Estados para os nossos filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ativas'); // Padrão para "Apenas Ativas"
  const [categoryFilter, setCategoryFilter] = useState('todas');

  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    inactiveJobs: 0,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);

    // Busca vagas e lojas em paralelo para mais eficiência
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

  // 2. Lógica de filtragem
  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      // Filtro de Status
      const matchesStatus = statusFilter === 'todas' || (statusFilter === 'ativas' && job.is_active) || (statusFilter === 'inativas' && !job.is_active);

      // Filtro de Categoria
      const matchesCategory = categoryFilter === 'todas' || job.job_category === categoryFilter;

      // Filtro de Pesquisa (Título ou Loja)
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm ||
        job.title.toLowerCase().includes(lowerSearchTerm) ||
        (job.lojas && job.lojas.name.toLowerCase().includes(lowerSearchTerm));

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [allJobs, searchTerm, statusFilter, categoryFilter]);


  const handleOpenModal = (job = null) => { setIsModalOpen(true); setEditingJob(job); };
  const handleCloseModal = () => { setIsModalOpen(false); setEditingJob(null); };

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
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total de Vagas" value={loading ? '...' : stats.totalJobs} icon={Briefcase} />
        <StatCard title="Vagas Ativas" value={loading ? '...' : stats.activeJobs} icon={CheckCircle2} />
        <StatCard title="Vagas Inativas" value={loading ? '...' : stats.inactiveJobs} icon={XCircle} />
      </div>

      {/* 3. O nosso novo Painel de Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="grid gap-2">
              <Label htmlFor="search">Buscar</Label>
              <Input 
                id="search" 
                placeholder="Título ou loja..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cargo">Cargo</Label>
              {/* O filtro por cargo pode ser implementado da mesma forma se necessário */}
              <Select>
                <SelectTrigger id="cargo">
                  <SelectValue placeholder="Todos os Cargos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Cargos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione o Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todos</SelectItem>
                  <SelectItem value="ativas">Apenas Ativas</SelectItem>
                  <SelectItem value="inativas">Apenas Inativas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="categoria">
                  <SelectValue placeholder="Selecione a Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="Aberta">Vaga Aberta</SelectItem>
                  <SelectItem value="Banco de Talentos">Banco de Talentos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">+ Adicionar ao Banco de Talentos</Button>
        <Button onClick={() => handleOpenModal()}>+ Criar Nova Vaga</Button>
      </div>

      {/* A nossa grelha de cartões agora usa 'filteredJobs' */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading ? <p>Carregando vagas...</p> : 
          filteredJobs.map(job => (
            <JobCardAdmin 
              key={job.id} 
              job={job} 
              onEdit={handleOpenModal}
              onDelete={handleDeleteJob}
            />
          ))
        }
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