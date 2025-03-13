// should be what people see when they first access our website
import Hero from "./components/Hero"
import HeroPool from "./components/HeroPool"
import ContactUs from "./components/ContactUs"
import Header from "./components/Header"
import FeatureHighlight from "./components/FeatureHighlight"

export default function LandingPage() {
  return (
    <main>
      <Header />
      <Hero />
      <FeatureHighlight />
      <HeroPool />
      <ContactUs />
    </main>
  );
}
