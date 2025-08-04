'use client'; // <-- MUITO IMPORTANTE!

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from 'swiper/modules';
import Link from 'next/link';

// Importar os estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Hero() {
  return (
    <section id="hero" className="relative">
      <Swiper
        // Adiciona os módulos que vamos usar
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
          el: '.hero-pagination',
          clickable: true,
          type: 'progressbar',
        }}
        navigation={{
          nextEl: '.hero-nav-next',
          prevEl: '.hero-nav-prev',
        }}
        className="hero-swiper" // Classe para estilização customizada
      >
        <div className="swiper-wrapper">
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="slide-background" style={{ backgroundImage: "url('/img/banner.jpg')" }} data-swiper-parallax="-23%"></div>
            <div className="slide-content">
              <Link href="/lojas" className="cta-button bg-help-purple text-white" data-swiper-parallax="-100">
                Encontrar Loja
              </Link>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="slide-background" style={{ backgroundImage: "url('/img/nossahistoria.jpg')" }} data-swiper-parallax="-23%"></div>
            <div className="slide-content">
              <Link href="/#quem-somos" className="cta-button bg-white text-help-purple" data-swiper-parallax="-100">
                Quem Somos
              </Link>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="slide-background" style={{ backgroundImage: "url('/img/trabalhe-conosco.jpg')" }} data-swiper-parallax="-23%"></div>
            <div className="slide-content">
              <Link href="/vagas" className="cta-button bg-white text-help-purple" data-swiper-parallax="-100">
                Nossas Vagas
              </Link>
            </div>
          </SwiperSlide>
        </div>
        
        {/* Elementos de Navegação e Paginação */}
        <div className="swiper-button-prev hero-nav-prev"></div>
        <div className="swiper-button-next hero-nav-next"></div>
        <div className="swiper-pagination hero-pagination"></div>
      </Swiper>
    </section>
  );
}