import { Medal, Package, Truck, Users } from "lucide-react";

const ITEMS = [
  { icon: Medal, value: "25+", label: "Years Experience" },
  { icon: Users, value: "1000+", label: "Customers" },
  { icon: Package, value: "Bulk", label: "Supply" },
  { icon: Truck, value: "Reliable", label: "Delivery" },
];

export default function TrustStrip() {
  return (
    <section aria-label="Company highlights" className="border-b border-brand-line bg-white">
      <ul className="container-site grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4 lg:py-12">
        {ITEMS.map((item) => (
          <li key={item.label} className="flex items-center gap-3.5 lg:justify-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-green/10 text-brand-green">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="flex items-center gap-1.5 text-lg font-bold text-brand-ink sm:text-xl">
                {item.value}
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-gold-dark" />
              </span>
              <span className="text-xs font-medium text-brand-muted sm:text-sm">{item.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
