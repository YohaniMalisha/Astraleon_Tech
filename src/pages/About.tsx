import Header from '../components/Header';
import About from '../components/About';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-4"> {/* Reduced top padding */}
        <About />
      </main>
      <Footer />
    </div>
  );
};


export default AboutPage;
