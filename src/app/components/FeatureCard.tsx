interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <section className="bg-white text-black rounded-xl p-4 m-2 lg:m-4 shadow-xl">
      <h3 className="text-md md:text-xl font-semibold p-4">{title}</h3>
      <p className="text-left p-4">{description}</p>
    </section>
  );
}
