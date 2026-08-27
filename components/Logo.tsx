import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Thirumalaai Traders – Home"
      className={cn("inline-flex items-center", className)}
    >
      <img
        src="/images/thirumalaai-traders-logo.png"
        alt="Thirumalaai Traders"
        className="h-auto w-[150px] object-contain sm:w-[160px] lg:w-[200px]"
      />
    </Link>
  );
}
