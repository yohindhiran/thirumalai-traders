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
        <p className="eyebrow mb-3">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
        {title}
      </h2>
      <span aria-hidden="true" className={`accent-line mb-2 mt-5 ${align === "center" ? "mx-auto" : ""}`} />
      {description && (
        <p className="mt-4 leading-relaxed text-brand-muted">{description}</p>
      )}
    </div>
  );
}
