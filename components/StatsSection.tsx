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
    <section className="border-y border-brand-line bg-gradient-to-b from-brand-cream via-white to-white">
      <div className="container-site grid grid-cols-2 gap-y-10 py-12 text-center lg:grid-cols-4 lg:py-16">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-4">
            <p className="text-3xl font-bold tracking-tight text-emerald-700 sm:text-5xl">
              {stat.value === "7+" ? (
                <>7+</>
              ) : (
                <Counter target={parseInt(stat.value, 10) || 0} />
              )}
            </p>
            <span aria-hidden="true" className="mx-auto my-2 block h-1 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400" />
            <p className="text-sm font-medium text-brand-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
