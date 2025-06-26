import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Packages from '../components/Packages';
import { useLocation } from 'react-router-dom';

const PackagesPage = () => {
  const location = useLocation();
  const isBasePath = location.pathname === '/packages';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black">
      <Header />
      <main className="pt-20 pb-12"> {/* Adjusted padding to account for fixed header */}
        {isBasePath ? (
          // Show main packages selection grid
          <Packages /> 
        ) : (
          // Show nested package type pages
          <div className="container mx-auto px-4">
            <Outlet />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PackagesPage;