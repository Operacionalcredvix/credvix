'use client';

// Importações do Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importar os estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Importar o nosso CSS Module
import styles from './Depoimentos.module.css';

export default function Depoimentos() {
  return (
    <section id="depoimentos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="section-title">A Voz da Nossa Equipe</h2>
          <p className="section-subtitle">
            Veja o que nossos colaboradores dizem sobre fazer parte do time Credvix & Help!
          </p>
        </div>

        <div className={styles.swiperContainer}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              // Adicionaremos estilos globais para a paginação
              el: '.testimonial-pagination',
            }}
            navigation={{
              // Adicionaremos estilos globais para a navegação
              nextEl: '.testimonial-nav-next',
              prevEl: '.testimonial-nav-prev',
            }}
            // Configuração de quantos slides aparecem em cada tamanho de tela
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              }
            }}
          >
            <SwiperSlide className={styles.slide}>
              <div className={styles.card}>
                <figure className={styles.figure}>
                  <blockquote className={styles.quote}>
                    <p>“Trabalhar na Credvix é fazer parte de uma família que te apoia e te desafia a crescer todos os dias.”</p>
                  </blockquote>
                  <figcaption className={styles.figcaption}>
                    <img className={styles.authorImage} src="https://i.pravatar.cc/100?img=1" alt="Foto da colaboradora Ana Júlia" />
                    <div className={styles.authorDetails}>
                      <cite className="font-medium text-gray-800">Ana Júlia Siqueira</cite>
                      <cite className="text-sm text-gray-500">Consultora de Vendas</cite>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </SwiperSlide>
            
            <SwiperSlide className={styles.slide}>
              <div className={styles.card}>
                <figure className={styles.figure}>
                  <blockquote className={styles.quote}>
                    <p>“O que mais me motiva é a cultura de reconhecimento e a transparência da liderança. Aqui, seu esforço é visto e valorizado.”</p>
                  </blockquote>
                  <figcaption className={styles.figcaption}>
                    <img className={styles.authorImage} src="https://i.pravatar.cc/100?img=2" alt="Foto do colaborador Marcos Ribeiro" />
                    <div className={styles.authorDetails}>
                      <cite className="font-medium text-gray-800">Marcos Ribeiro</cite>
                      <cite className="text-sm text-gray-500">Gerente de Loja</cite>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </SwiperSlide>

          </Swiper>
          {/* Elementos para Navegação e Paginação */}
          <div className="swiper-button-next testimonial-nav-next"></div>
          <div className="swiper-button-prev testimonial-nav-prev"></div>
          <div className="swiper-pagination testimonial-pagination"></div>
        </div>
      </div>
    </section>
  );
}