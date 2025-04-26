import Hero from './components/Hero';
import HeroPool from './components/HeroPool';
import ContactUs from './components/ContactUs';
import Header from './components/Header';
import FeatureHighlight from './components/FeatureHighlight';
import Footer from './components/Footer';

export default function LandingPage() {
  return (
    <main>
      <Header />
      <Hero />
      <FeatureHighlight />
      <HeroPool />
      <ContactUs />
      <Footer />
    </main>
  );
}
