'use client';

import { useState, useMemo } from 'react';
import JobCard from './JobCard';
import ApplicationModal from '../ApplicationModal';
import styles from './JobList.module.css';

export default function JobList({ jobs }) {
  const [locationFilter, setLocationFilter] = useState('todos');
  const [titleFilter, setTitleFilter] = useState('todos');
  const [categoryFilter, setCategoryFilter] = useState('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApplyClick = (title, storeName, jobId) => {
    setSelectedJob({ title, storeName, jobId });
    setIsModalOpen(true);
  };

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
      <section id="trabalhe-conosco" className="py-14 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Faça Parte da Nossa Equipe</h2>
            <p className="section-subtitle">Estamos sempre em busca de novos talentos. Confira nossas vagas abertas e venha crescer com a gente!</p>
          </div>

          <div className={styles.filtersContainer}>
            <div className={styles.filterGroup}>
              <label htmlFor="job-location-select">Filtrar por estado:</label>
              <select id="job-location-select" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className={styles.filterSelect}>
                <option value="todos">Todos os Estados</option>
                {availableLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label htmlFor="job-title-select">Filtrar por nome da vaga:</label>
              <select id="job-title-select" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} className={styles.filterSelect}>
                <option value="todos">Todas as Vagas</option>
                {availableTitles.map(title => <option key={title} value={title}>{title}</option>)}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label htmlFor="job-category-select">Filtrar por categoria:</label>
              <select id="job-category-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={styles.filterSelect}>
                <option value="todos">Todas as Categorias</option>
                <option value="Aberta">Vaga Aberta</option>
                <option value="Banco de Talentos">Banco de Talentos</option>
              </select>
            </div>
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
        onClose={() => setIsModalOpen(false)} 
        jobInfo={selectedJob} 
      />
    </>
  );
}