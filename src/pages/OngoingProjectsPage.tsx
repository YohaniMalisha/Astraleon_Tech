import Header from "../components/Header";
import Footer from "../components/Footer";
import OngoingProjects from "../components/OngoingProjects";

const OngoingProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <OngoingProjects />
      </main>
      <Footer />
    </div>
  );
};

export default OngoingProjectsPage;
