import Header from '../components/Header';
import Packages from '../components/Packages';
import Footer from '../components/Footer';

const PackagesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-4"> {/* Reduced top padding */}
        <Packages />
      </main>
      <Footer />
    </div>
  );
};

export default PackagesPage;
