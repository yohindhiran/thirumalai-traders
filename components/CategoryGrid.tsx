import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCT_SEEDS } from "@/data/products-seed";

const CARDS = [
  { slug: "spices", name: "Spices", image: "/images/cat-spices.jpg", alt: "Assorted whole spices — coriander, pepper, cardamom and chilli" },
  { slug: "grains-pulses", name: "Grains & Pulses", image: "/images/cat-grains-pulses.jpg", alt: "Bowl of chickpeas — dals and pulses supplied in bulk" },
  { slug: "rice-lentils", name: "Rice & Lentils", image: "/images/cat-rice-lentils.jpg", alt: "Premium raw rice grains supplied wholesale" },
  { slug: "masala", name: "Masala", image: "/images/cat-masala.jpg", alt: "Ground masala and spice powders in spoons" },
  { slug: "dry-fruits-nuts", name: "Dry Fruits & Nuts", image: "/images/cat-dry-fruits-nuts.jpg", alt: "Almonds — dry fruits and nuts in bulk" },
  { slug: "oils", name: "Oils", image: "/images/cat-oils.jpg", alt: "Cooking oil supplied in bulk tins and containers" },
  { slug: "atta-flour-grocery", name: "Atta, Flour & Grocery", image: "/images/cat-atta-flour-grocery.jpg", alt: "Bowl of wheat atta flour with grocery essentials" },
];

export default function CategoryGrid() {
  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-white">
      <div className="container-site">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          Product Categories
        </h2>
        <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-14 bg-brand-gold" />

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CARDS.map((cat) => {
            const count = (PRODUCT_SEEDS[cat.slug] || []).length;
            return (
              <li key={cat.slug}>
                <Link
                  href={`/products/${cat.slug}`}
                  className="card group block overflow-hidden transition-shadow hover:shadow-lift"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1 bg-brand-gold opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-brand-green">{cat.name}</h3>
                    {count > 0 && (
                      <p className="mt-1 text-sm text-brand-muted">
                        {count}+ Products
                      </p>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                      View Products
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
