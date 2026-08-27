import Image from "next/image";

const IMAGES = [
  { src: "/images/hero-rice.jpg", alt: "Premium raw rice grains supplied in bulk" },
  { src: "/images/hero-pulses.jpg", alt: "Pulses and dals supplied wholesale" },
  { src: "/images/hero-spices.jpg", alt: "Whole spices and masalas" },
  { src: "/images/hero-oil.jpg", alt: "Cooking oil supplied in bulk" },
  { src: "/images/hero-nuts.jpg", alt: "Bulk dry fruits and nuts" },
  { src: "/images/cat-spices.jpg", alt: "Spices category" },
  { src: "/images/cat-grains-pulses.jpg", alt: "Grains and pulses category" },
  { src: "/images/cat-rice-lentils.jpg", alt: "Rice and lentils category" },
  { src: "/images/cat-masala.jpg", alt: "Masala category" },
  { src: "/images/cat-dry-fruits-nuts.jpg", alt: "Dry fruits and nuts category" },
  { src: "/images/cat-oils.jpg", alt: "Oils category" },
  { src: "/images/cat-atta-flour-grocery.jpg", alt: "Atta and flour grocery category" },
  { src: "/images/about-warehouse.jpg", alt: "Wholesale grocery warehouse with bulk inventory" },
];

export default function ProductShowcase() {
  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-white">
      <div className="container-site">
        <div className="mb-7 text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
            <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
            What We Supply
            <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            A Wide Range of Wholesale Grocery Products
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {IMAGES.map((img) => (
            <div
              key={img.src}
              className="relative aspect-square overflow-hidden rounded-lg shadow-card"
            >
              <Image
                src={img.src}
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
