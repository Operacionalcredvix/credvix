'use client';

import Link from 'next/link';

// Importações do Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from 'swiper/modules';

// Importar os estilos do Swiper é crucial
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Importar o nosso CSS Module
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className="relative">
      <Swiper
        // Módulos que vamos usar
        modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
        loop={true}
        effect="fade"
        parallax={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          el: `.${styles.pagination}`, // Usa a nossa classe do módulo
          clickable: true,
          type: 'progressbar',
        }}
        navigation={{
          nextEl: '.hero-nav-next', // A classe para o botão de avançar
          prevEl: '.hero-nav-prev', // A classe para o botão de voltar
        }}
        className={styles.heroSwiper}
      >
        {/* Slide 1 */}
        <SwiperSlide className={styles.slide}>
          <div className={styles.slideBackground} style={{ backgroundImage: "url('/img/banner.jpg')" }} data-swiper-parallax="-23%"></div>
          <div className={styles.slideContent}>
            {/* <Link href="/lojas" className="cta-button bg-help-purple text-white" data-swiper-parallax="-100">
              Encontrar Loja
            </Link> */}
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className={styles.slide}>
          <div className={styles.slideBackground} style={{ backgroundImage: "url('/img/nossahistoria.jpg')" }} data-swiper-parallax="-23%"></div>
          <div className={styles.slideContent}>
            {/* <Link href="/#quem-somos" className="cta-button bg-white text-help-purple" data-swiper-parallax="-100">
              Quem Somos
            </Link> */}
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className={styles.slide}>
          <div className={styles.slideBackground} style={{ backgroundImage: "url('/img/trabalhe-conosco.jpg')" }} data-swiper-parallax="-23%"></div>
          <div className={styles.slideContent}>
            {/* <Link href="/vagas" className="cta-button bg-white text-help-purple" data-swiper-parallax="-100">
              Nossas Vagas
            </Link> */}
          </div>
        </SwiperSlide>

        {/* Elementos de Navegação (precisam estar fora do .swiper-wrapper) */}
        <div className={`swiper-button-prev hero-nav-prev ${styles.navButton}`}></div>
        <div className={`swiper-button-next hero-nav-next ${styles.navButton}`}></div>
        <div className={styles.pagination}></div>
      </Swiper>
    </section>
  );
}