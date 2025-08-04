// app/lojas/page.jsx
import { supabase } from '@/lib/supabaseClient'; // Nosso cliente Supabase
import StoreList from '@/app/components/StoreList'; // O componente de cliente que criamos

// Esta função busca os dados no servidor
async function getStores() {
  // O .select('*') busca todas as colunas. O .order('name') ordena por nome.
  const { data, error } = await supabase.from('lojas').select('*').order('name');
  
  if (error) {
    console.error("Erro ao buscar lojas:", error);
    // Em um app real, poderíamos tratar o erro de forma mais elegante
    return []; 
  }

  return data;
}


// A página em si é um Componente de Servidor 'async'
export default async function LojasPage() {
  // Chamamos a função para buscar os dados. O Next.js vai esperar isso terminar.
  const stores = await getStores();

  return (
    <>
      {/* Seção estática do topo da página */}
      <section id="mapa-lojas" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="section-title">Encontre nossa loja mais próxima</h1>
          <div className="my-8">
            <img src="/img/Mapa.png" alt="Mapa do Brasil com os estados de atuação da Credvix" className="mx-auto max-w-lg w-full h-auto" />
          </div>
          <p className="text-lg font-semibold text-gray-600">
            Maior franqueado ES da HELP! Onde chegamos: ES, MG, GO, BA, MT, DF
          </p>
        </div>
      </section>
      
      {/* Renderizamos o componente de cliente StoreList e passamos as lojas
        que buscamos no servidor como uma prop.
      */}
      <StoreList stores={stores} />
    </>
  );
}