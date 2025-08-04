// components/JobCard.jsx

export default function JobCard({ job, onApply }) {
  const categoryClass = job.job_category === 'Banco de Talentos' ? 'category-talent' : 'category-open';
  const storeName = job.lojas ? job.lojas.name : job.storename;
  const city = job.lojas ? job.lojas.city : job.city;
  const state = job.lojas ? job.lojas.state : job.state;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border flex flex-col h-full">
      <div className="flex-grow">
        <div className="job-card-header">
          <span className="inline-block bg-credvix-orange text-white text-xs font-semibold px-3 py-1 rounded-full">{job.type || ''}</span>
          <span className={`category-indicator ${categoryClass}`}>{job.job_category}</span>
        </div>
        <h3 className="text-lg font-bold text-help-purple mt-3">{job.title}</h3>
        <p className="text-gray-600 font-semibold text-sm">{storeName} - {city}, {state}</p>
        <p className="text-gray-500 text-sm mt-2">{job.description || ''}</p>
      </div>
      <div className="mt-4">
        <button 
            className="apply-btn block w-full text-center bg-help-purple text-white font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            onClick={() => onApply(job.title, storeName, job.id)}
        >
          Candidatar-se
        </button>
      </div>
    </div>
  );
}