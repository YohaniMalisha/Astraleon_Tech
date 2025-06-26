
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header /> {/* Transparent by default */}
      <Hero />
      <Footer />
    </div>
  );
};
export default Index;
