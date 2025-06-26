import Services from '@/components/Services';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Header />
      <main>
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;