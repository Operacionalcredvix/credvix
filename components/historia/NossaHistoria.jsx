import Image from 'next/image';
import styles from './NossaHistoria.module.css';

export default function NossaHistoria() {
  return (
    <section id="quem-somos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>

          {/* Coluna da Imagem */}
          <div className={styles.imageColumn}>
            <Image
              src="/img/nossahistoria.jpg"
              alt="Equipe Credvix com o troféu Honey"
              className={styles.image}
              width={700}
              height={467}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Coluna do Texto */}
          <div className={styles.textColumn}>
            <h2 className={`section-title ${styles.mainHeading}`}>Nossa História</h2>
            <p>
              A CREDVIX foi fundada no ano de 2011, é uma empresa sólida, dinâmica, competente e próspera, que supera as expectativas de nossos clientes, parceiros e colaboradores pela excelência da qualidade de seus serviços prestados.
            </p>
            <p>
              Buscando sempre atender nossos clientes e compreender suas necessidades com precisão e agilidade em seus serviços, a Credvix tem um atendimento personalizado e eficiente que garante segurança e credibilidade nas mais diversas operações.
            </p>
            <h3 className={styles.missionHeading}>Nossa Missão</h3>
            <p>
              Trazemos soluções financeiras de forma simples e rápida, atendendo às necessidades de seus clientes através de um serviço personalizado e eficiente.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}