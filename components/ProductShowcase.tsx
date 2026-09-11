import Image from "next/image";
import { getHomeShowcase } from "@/lib/db";

export default function ProductShowcase() {
  const items = getHomeShowcase();
  const display = items.length
    ? items
    : [
        { image: "/images/hero-rice.jpg", alt: "Premium raw rice grains supplied in bulk" },
        { image: "/images/hero-pulses.jpg", alt: "Pulses and dals supplied wholesale" },
        { image: "/images/hero-spices.jpg", alt: "Whole spices and masalas" },
        { image: "/images/hero-oil.jpg", alt: "Cooking oil supplied in bulk" },
        { image: "/images/hero-nuts.jpg", alt: "Bulk dry fruits and nuts" },
      ];

  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-white">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {display.map((img, i) => (
            <div
              key={img.image + i}
              className="relative aspect-square overflow-hidden"
            >
              <Image
                src={img.image}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
