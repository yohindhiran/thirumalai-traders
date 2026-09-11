import Image from "next/image";

export default function PageHero({
  title,
  backgroundImage,
}: {
  title: string;
  backgroundImage: string;
}) {
  return (
    <section className="relative flex h-[240px] items-center justify-center overflow-hidden sm:h-[280px] lg:h-[320px]">
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-brand-green-deep/60" />
      <div className="container-site relative flex flex-col items-center py-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        <span aria-hidden="true" className="mt-3 block h-1 w-14 bg-brand-gold" />
      </div>
    </section>
  );
}
