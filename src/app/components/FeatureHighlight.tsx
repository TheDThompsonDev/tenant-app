import LABELS from "../constants/labels";
import FeatureCard from "./FeatureCard";

export default function FeatureHighlight() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{LABELS.featureHighlight.title}</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {LABELS.featureHighlight.featureCards.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
