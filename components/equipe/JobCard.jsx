import styles from './JobCard.module.css';

// Este componente recebe a função 'onApply' como uma propriedade (prop)
export default function JobCard({ job, onApply }) {
  const categoryClass = job.job_category === 'Banco de Talentos' 
    ? styles.categoryTalent 
    : styles.categoryOpen;

  const storeName = job.lojas ? job.lojas.name : job.storename;
  const city = job.lojas ? job.lojas.city : job.city;
  const state = job.lojas ? job.lojas.state : job.state;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.badgeType}>{job.type || 'Tempo Integral'}</span>
        <span className={categoryClass}>{job.job_category}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{job.title}</h3>
        <p className={styles.location}>{storeName} - {city}, {state}</p>
      </div>
      <div className="mt-auto">
        {/* O onClick aqui chama a função 'onApply' que foi passada pelo JobList */}
        <button 
            className={styles.applyButton}
            onClick={() => onApply(job.title, storeName, job.id)}
        >
          Candidatar-se
        </button>
      </div>
    </div>
  );
}