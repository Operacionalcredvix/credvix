import { supabase } from '../../lib/supabaseClient'; 
import StoreList from '../../components/lojas/StoreList'; 

async function getStores() {
  const { data, error } = await supabase.from('lojas').select('*').order('name');
  if (error) {
    console.error("Erro ao buscar lojas:", error);
    return []; 
  }
  return data;
}

export default async function LojasPage() {
  const stores = await getStores();
  return (
    <>
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
      <StoreList stores={stores} />
    </>
  );
}