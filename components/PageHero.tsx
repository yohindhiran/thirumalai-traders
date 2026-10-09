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
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-brand-green-deep/70 via-brand-green-deep/55 to-emerald-950/65" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 via-brand-gold to-amber-500" />
      <div className="container-site relative flex flex-col items-center py-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        <span aria-hidden="true" className="mt-3 block h-1 w-14 rounded-full bg-gradient-to-r from-emerald-400 via-brand-gold to-amber-400" />
      </div>
    </section>
  );
}
