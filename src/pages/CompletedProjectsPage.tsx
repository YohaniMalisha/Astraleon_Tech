import Header from "../components/Header";
import Footer from "../components/Footer";
import CompletedProjects from "../components/CompletedProjects";

const CompletedProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CompletedProjects />
      </main>
      <Footer />
    </div>
  );
};

export default CompletedProjectsPage;
