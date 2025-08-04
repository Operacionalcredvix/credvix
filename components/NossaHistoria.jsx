import Image from 'next/image';
import historiaImage from '../public/img/nossahistoria.jpg';

export default function NossaHistoria() {
  return (
    <section id="quem-somos" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Usamos Flexbox aqui. 'md:flex-row' alinha os itens lado a lado em telas médias e maiores */}
        <div className="flex flex-col md:flex-row gap-12 items-center">

          {/* Coluna da Imagem (Item 1 do Flexbox) */}
          {/* 'md:w-1/2' faz com que a imagem ocupe metade da largura em telas médias */}
          <div className="w-full md:w-1/2">
            <Image
              src={historiaImage}
              alt="Equipe Credvix com o troféu Honey"
              className="rounded-lg shadow-xl w-full h-auto"
              placeholder="blur"
            />
          </div>

          {/* Coluna do Texto (Item 2 do Flexbox) */}
          {/* 'md:w-1/2' faz com que o texto ocupe a outra metade da largura */}
          <div className="w-full md:w-1/2 space-y-6 text-gray-700">
            <h2 className="section-title text-left">Nossa História</h2>
            <p>A CREDVIX foi fundada no ano de 2011, é uma empresa sólida, dinâmica, competente e próspera, que supera as expectativas de nossos clientes, parceiros e colaboradores pela excelência da qualidade de seus serviços prestados.</p>
            <p>Buscando sempre atender nossos clientes e compreender suas necessidades com precisão e agilidade em seus serviços, a Credvix tem um atendimento personalizado e eficiente que garante segurança e credibilidade nas mais diversas operações.</p>
            <h3 className="text-2xl font-bold text-help-purple pt-4">Nossa Missão</h3>
            <p>Trazemos soluções financeiras de forma simples e rápida, atendendo às necessidades de seus clientes através de um serviço personalizado e eficiente.</p>
          </div>
        </div>
      </div>
    </section>
  );
}