import { supabase } from '../../lib/supabaseClient'; 
import StoreList from '../../components/lojas/StoreList';
import styles from './LojasPage.module.css'; // 1. Importa o nosso novo módulo de estilos

// A função para buscar os dados no servidor continua igual
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
      {/* 2. Aplicamos a nossa nova classe de ecrã inteiro */}
      <section id="mapa-lojas" className={styles.mapSection}>
        {/* O container interno agora é um 'div' simples, pois a section já centraliza tudo */}
        <div>
          <h1 className="section-title">Encontre nossa loja mais próxima</h1>
          
          <div className={styles.mapImageContainer}>
            <img src="/img/Mapa.png" alt="Mapa do Brasil com os estados de atuação da Credvix" className={styles.mapImage} />
          </div>
          
          <p className={styles.subtitle}>
            Maior franqueado ES da HELP! Onde chegamos: ES, MG, GO, BA, MT, DF
          </p>
        </div>
      </section>

      {/* A lista de lojas continua a funcionar como antes */}
      <StoreList stores={stores} />
    </>
  );
}