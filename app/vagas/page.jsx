// app/vagas/page.jsx
import { supabase } from '../../lib/supabaseClient'; // Usando caminho relativo
import JobList from '../../components/JobList'; // Usando caminho relativo

// Função que busca os dados no servidor
async function getActiveJobs() {
  const { data, error } = await supabase
    .from('vagas')
    .select(`
        *,
        lojas ( name, city, state )
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Erro ao buscar vagas:", error);
    return [];
  }

  return data;
}

// A página em si
export default async function VagasPage() {
  const activeJobs = await getActiveJobs();

  // A seção de depoimentos e benefícios do seu vagas.html original
  const topSections = (
    <>
      <section id="depoimentos" className="py-16 md:py-24 bg-white">
        {/* ... Cole aqui o conteúdo da seção 'Depoimentos' do seu vagas.html ... */}
      </section>
      <div className="text-center mt-16 md:mt-24 mb-16">
        <h2 className="section-title">Nossos Benefícios</h2>
        <p className="section-subtitle">Fique por dentro dos Beneficios para colaboradores Credvix.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* ... Cole aqui o conteúdo da seção 'Benefícios' ... */}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Aqui você pode colar as seções estáticas se desejar, como depoimentos e benefícios */}
      {/* {topSections} */}
      
      {/* Renderizamos o componente de cliente JobList e passamos as vagas */}
      <JobList jobs={activeJobs} />
    </>
  );
}