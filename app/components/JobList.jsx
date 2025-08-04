
'use client';

import { useState, useMemo } from 'react';
import JobCard from './JobCard'; // Componente que renderiza cada vaga
import ApplicationModal from './ApplicationModal'; // Criaremos este modal a seguir

export default function JobList({ jobs }) {
  // Estados para os filtros
  const [locationFilter, setLocationFilter] = useState('todos');
  const [titleFilter, setTitleFilter] = useState('todos');
  const [categoryFilter, setCategoryFilter] = useState('todos');

  // Estados para o Modal de candidatura
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Lógica para abrir o modal
  const handleApplyClick = (title, storeName, jobId) => {
    setSelectedJob({ title, storeName, jobId });
    setIsModalOpen(true);
  };

  // Listas de opções para os filtros
  const availableLocations = useMemo(() => [...new Set(jobs.map(job => job.lojas?.state).filter(Boolean))].sort(), [jobs]);
  const availableTitles = useMemo(() => [...new Set(jobs.map(job => job.title).filter(Boolean))].sort(), [jobs]);

  // Lógica de filtragem
  const filteredJobs = useMemo(() => {
    return jobs.filter(job =>
      (locationFilter === 'todos' || job.lojas?.state === locationFilter) &&
      (titleFilter === 'todos' || job.title === titleFilter) &&
      (categoryFilter === 'todos' || job.job_category === categoryFilter)
    );
  }, [jobs, locationFilter, titleFilter, categoryFilter]);

  return (
    <>
      <section id="trabalhe-conosco" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Faça Parte da Nossa Equipe</h2>
            <p className="section-subtitle">Estamos sempre em busca de novos talentos. Confira nossas vagas abertas e venha crescer com a gente!</p>
          </div>

          {/* Filtros */}
          <div className="max-w-4xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="job-location-select" className="block text-sm font-medium text-gray-700 mb-2">Filtrar por estado:</label>
              <select id="job-location-select" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 ring-help-purple">
                <option value="todos">Todos os Estados</option>
                {availableLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="job-title-select" className="block text-sm font-medium text-gray-700 mb-2">Filtrar por nome da vaga:</label>
              <select id="job-title-select" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 ring-help-purple">
                <option value="todos">Todas as Vagas</option>
                {availableTitles.map(title => <option key={title} value={title}>{title}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="job-category-select" className="block text-sm font-medium text-gray-700 mb-2">Filtrar por categoria:</label>
              <select id="job-category-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 ring-help-purple">
                <option value="todos">Todas as Categorias</option>
                <option value="Aberta">Vaga Aberta</option>
                <option value="Banco de Talentos">Banco de Talentos</option>
              </select>
            </div>
          </div>

          {/* Grid de Vagas */}
          {filteredJobs.length > 0 ? (
            <div id="job-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} onApply={handleApplyClick} />
              ))}
            </div>
          ) : (
            <div id="no-jobs-message" className="text-center text-gray-500 mt-8">
              <p>Nenhuma vaga aberta encontrada para os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* O Modal (será exibido condicionalmente) */}
      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        jobInfo={selectedJob} 
      />
    </>
  );
}