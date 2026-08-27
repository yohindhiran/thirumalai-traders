import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green">
          <span aria-hidden="true" className="h-px w-6 bg-brand-gold-dark" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 leading-relaxed text-brand-muted">{description}</p>
      )}
    </div>
  );
}
