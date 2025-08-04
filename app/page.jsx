import Hero from '../components/hero/Hero';
import NossaHistoria from '../components/historia/NossaHistoria';

// Componente para a seção "Nossos Valores" para manter o código organizado
function NossosValores() {
  return (
    <section className="bg-white pb-16 md:pb-24">
        <div className="container mx-auto px-6">
            <div className="text-center">
                <h2 className="section-title">Nossos Valores</h2>
                <p className="section-subtitle">
                    Trabalhamos com respeito, honestidade, dedicação, comprometimento, profissionalismo e transparência em busca do desenvolvimento das pessoas.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
                    <div className="value-card">
                        <div className="value-icon"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>
                        <span className="font-semibold">Respeito</span>
                    </div>
                    <div className="value-card">
                        <div className="value-icon"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                        <span className="font-semibold">Honestidade</span>
                    </div>
                    <div className="value-card">
                        <div className="value-icon"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></div>
                        <span className="font-semibold">Dedicação</span>
                    </div>
                    <div className="value-card">
                        <div className="value-icon"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
                        <span className="font-semibold">Comprometimento</span>
                    </div>
                    <div className="value-card">
                        <div className="value-icon"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                        <span className="font-semibold">Profissionalismo</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}


export default function HomePage() {
  return (
    <>
      <Hero />
      <NossaHistoria />
      <NossosValores />
    </>
  );
}