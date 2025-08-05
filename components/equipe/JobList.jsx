'use client';

import { useState, useMemo } from 'react';
import JobCard from './JobCard';
import ApplicationModal from '../ApplicationModal';
import styles from './JobList.module.css';

export default function JobList({ jobs }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApplyClick = (title, storeName, jobId) => {
    // --- MENSAGENS DE DIAGNÓSTICO ---
    console.log('--- PASSO 1: Botão "Candidatar-se" foi clicado! ---');
    console.log('Dados da Vaga:', { title, storeName, jobId });
    
    setSelectedJob({ title, storeName, jobId });
    setIsModalOpen(true); // Isto deveria fazer o modal abrir
    
    console.log('--- PASSO 2: Estado para abrir o modal foi definido para "true". ---');
    // --- FIM DAS MENSAGENS ---
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  // ... (o resto do seu código de filtros continua igual)
  const [locationFilter, setLocationFilter] = useState('todos');
  const [titleFilter, setTitleFilter] = useState('todos');
  const [categoryFilter, setCategoryFilter] = useState('todos');
  const availableLocations = useMemo(() => [...new Set(jobs.map(job => job.lojas?.state).filter(Boolean))].sort(), [jobs]);
  const availableTitles = useMemo(() => [...new Set(jobs.map(job => job.title).filter(Boolean))].sort(), [jobs]);
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

          <div className={styles.filtersContainer}>
           {/* ... filtros ... */}
          </div>

          {filteredJobs.length > 0 ? (
            <div className={styles.jobGrid}>
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} onApply={handleApplyClick} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <p>Nenhuma vaga aberta encontrada para os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>
      
      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        jobInfo={selectedJob} 
      />
    </>
  );
}