import Hero from '../components/hero/Hero';
import NossaHistoria from '../components/historia/NossaHistoria';
import NossosValores from '../components/valores/NossosValores'; 



export default function HomePage() {
  return (
    <>
      <Hero />
      <NossaHistoria />
      <NossosValores />
    </>
  );
}