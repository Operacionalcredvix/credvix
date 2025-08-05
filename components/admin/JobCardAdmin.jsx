import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home } from "lucide-react";
import styles from './JobCardAdmin.module.css';

export default function JobCardAdmin({ job, onEdit, onDelete }) {
  const candidateCount = job.candidatos[0]?.count || 0;
  const storeInfo = job.lojas ? `${job.lojas.name} - ${job.lojas.city}` : 'Loja não vinculada';

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{job.title}</h3>
          <p className={styles.location}>
            <Home className="h-4 w-4" /> {storeInfo}
          </p>
        </div>
        {job.is_active && <span className={styles.statusActive}>Ativa</span>}
      </div>

      <div className={styles.body}>
        <div className={styles.detailItem}>
          <p className={styles.detailValue}>{candidateCount}</p>
          <p className={styles.detailLabel}>Candidaturas</p>
        </div>
        <div className={styles.detailItem}>
          <Badge variant={job.job_category === 'Aberta' ? 'default' : 'secondary'}>
            {job.job_category}
          </Badge>
          <p className={styles.detailLabel}>Categoria</p>
        </div>
      </div>

      <div className={styles.footer}>
        <Button variant="outline" size="sm" onClick={() => onEdit(job)}>Editar</Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(job)}>Excluir</Button>
      </div>
    </div>
  );
}