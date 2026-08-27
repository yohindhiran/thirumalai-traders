export interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "25+", label: "Years Experience" },
  { value: "1000+", label: "Customers" },
  { value: "7+", label: "Business Segments" },
  { value: "25+", label: "Years of Trusted Supply" },
];

function Counter({ target }: { target: number }) {
  return <>{target.toLocaleString("en-IN")}+</>;
}

export default function StatsSection() {
  return (
    <section className="border-y border-brand-line bg-white">
      <div className="container-site grid grid-cols-2 gap-y-10 py-12 text-center lg:grid-cols-4 lg:py-16">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-4">
            <p className="text-3xl font-bold tracking-tight text-brand-green sm:text-5xl">
              {stat.value === "7+" ? (
                <>7+</>
              ) : (
                <Counter target={parseInt(stat.value, 10) || 0} />
              )}
            </p>
            <span aria-hidden="true" className="mx-auto my-2 block h-0.5 w-8 bg-brand-gold" />
            <p className="text-sm font-medium text-brand-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
