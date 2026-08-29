import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
