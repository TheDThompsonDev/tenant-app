import LABELS from "../constants/labels";
import FeatureCard from "./FeatureCard";

export default function FeatureHighlight() {
  return (
    <section className="bg-white py-8">
      <section>
        <h2 className="text-black text-4xl text-center flex justify-center items-center p-8">{LABELS.featureHighlight.title}</h2>
      </section>
      <section className="grid grid-cols-2 xl:grid-cols-3 grid-rows2 flex justify-center max-w-500 w-9/10  m-auto lg:p-4">
        {LABELS.featureHighlight.featureCards.map((feature, index) => {
          return (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
            />
          );
        })}
      </section>
    </section>
  );
}
