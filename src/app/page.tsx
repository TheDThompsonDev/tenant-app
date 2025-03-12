// should be what people see when they first access our website
import Hero from "./components/Hero"
import HeroPool from "./components/HeroPool"

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <HeroPool /> 
    </main>
  )
}