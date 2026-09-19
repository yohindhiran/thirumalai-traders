function BadgeFrame({ clipId }: { clipId?: string }) {
  return (
    <>
      <defs>
        <linearGradient id="trustGoldBand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9C184" />
          <stop offset="0.55" stopColor="#C8A95C" />
          <stop offset="1" stopColor="#AE8F45" />
        </linearGradient>
        <radialGradient id="trustSceneGlow" cx="0.5" cy="0.38" r="0.75">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="0.6" stopColor="#FFFDF2" stopOpacity="0.25" />
          <stop offset="1" stopColor="#FFFDF2" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="#1E3D29" />
      <circle cx="24" cy="24" r="20" fill="url(#trustGoldBand)" />
      <circle cx="24" cy="24" r="20" fill="none" stroke="#1E3D29" strokeWidth="1" opacity="0.55" />
      <circle cx="24" cy="4.4" r="1.2" fill="#1E3D29" />
      <circle cx="24" cy="43.6" r="1.2" fill="#1E3D29" />
      <circle cx="4.4" cy="24" r="1.2" fill="#1E3D29" />
      <circle cx="43.6" cy="24" r="1.2" fill="#1E3D29" />
      <circle cx="24" cy="24" r="17" fill="#1E3D29" />
      <circle cx="24" cy="24" r="15" fill="#E6D188" />
      <circle cx="24" cy="24" r="15" fill="none" stroke="#FFFDF2" strokeWidth="0.8" opacity="0.7" />
      <circle cx="24" cy="24" r="12.5" fill="#FFFDF2" />
      {clipId ? (
        <clipPath id={clipId}>
          <circle cx="24" cy="24" r="12.5" />
        </clipPath>
      ) : null}
      <circle cx="24" cy="24" r="12.5" fill="url(#trustSceneGlow)" />
      <path d="M11 14.5a16 16 0 0 1 11-6.5" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.5" />
    </>
  );
}

function ExperienceVisual({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <BadgeFrame />
      <path d="M24 11.8l1.1 2.25 2.45.35-1.78 1.72.42 2.44-2.19-1.15-2.19 1.15.42-2.44-1.78-1.72 2.45-.35z" fill="#C0A054" stroke="#1E3D29" strokeWidth="0.6" />
      <text
        x="24"
        y="29.5"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="12"
        fill="#1E3D29"
        letterSpacing="0.5"
      >
        25
      </text>
      <path d="M12.5 34.5c1-4.2 3.2-7.4 6.6-9.2" fill="none" stroke="#356747" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M35.5 34.5c-1-4.2-3.2-7.4-6.6-9.2" fill="none" stroke="#356747" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="14.6" cy="31" rx="1.2" ry="0.7" fill="#356747" transform="rotate(-40 14.6 31)" />
      <ellipse cx="16.4" cy="28.6" rx="1.2" ry="0.7" fill="#356747" transform="rotate(-40 16.4 28.6)" />
      <ellipse cx="18.6" cy="26.6" rx="1.2" ry="0.7" fill="#356747" transform="rotate(-40 18.6 26.6)" />
      <ellipse cx="33.4" cy="31" rx="1.2" ry="0.7" fill="#356747" transform="rotate(40 33.4 31)" />
      <ellipse cx="31.6" cy="28.6" rx="1.2" ry="0.7" fill="#356747" transform="rotate(40 31.6 28.6)" />
      <ellipse cx="29.4" cy="26.6" rx="1.2" ry="0.7" fill="#356747" transform="rotate(40 29.4 26.6)" />
      <rect x="19" y="32" width="10" height="3.4" rx="1" fill="#1E3D29" />
      <text x="24" y="34.5" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="2.4" fill="#E6D188" letterSpacing="1">
        YEARS
      </text>
    </svg>
  );
}

function CustomersVisual({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <BadgeFrame clipId="trust-customers-scene" />
      <g clipPath="url(#trust-customers-scene)">
        <circle cx="13.5" cy="20.5" r="3.6" fill="#C0A054" />
        <path d="M7.5 33.5c0-4 2.7-6 6-6s6 2 6 6v3.5h-12z" fill="#C0A054" />
        <circle cx="13.5" cy="20.5" r="3.6" fill="none" stroke="#1E3D29" strokeWidth="0.9" />
        <circle cx="34.5" cy="20.5" r="3.6" fill="#C0A054" />
        <path d="M28.5 33.5c0-4 2.7-6 6-6s6 2 6 6v3.5h-12z" fill="#C0A054" />
        <circle cx="34.5" cy="20.5" r="3.6" fill="none" stroke="#1E3D29" strokeWidth="0.9" />
        <circle cx="24" cy="18.5" r="4.8" fill="#356747" />
        <circle cx="22.6" cy="17.8" r="1.1" fill="#FFFFFF" opacity="0.35" />
        <path d="M13.5 35.5c0-5 4.2-7.6 10.5-7.6s10.5 2.6 10.5 7.6v3h-21z" fill="#356747" />
        <path d="M13.5 35.5c0-5 4.2-7.6 10.5-7.6s10.5 2.6 10.5 7.6" fill="none" stroke="#1E3D29" strokeWidth="1.2" />
        <circle cx="24" cy="18.5" r="4.8" fill="none" stroke="#1E3D29" strokeWidth="1.2" />
        <circle cx="24" cy="18.5" r="6.4" fill="none" stroke="#C0A054" strokeWidth="1" strokeDasharray="2.2 2" />
        <circle cx="12" cy="12.5" r="1" fill="#C0A054" />
        <circle cx="36" cy="12.5" r="1" fill="#C0A054" />
      </g>
      <circle cx="32.8" cy="31.8" r="4.6" fill="#1E3D29" />
      <circle cx="32.8" cy="31.8" r="4.6" fill="none" stroke="#E6D188" strokeWidth="1" />
      <circle cx="32.8" cy="31.8" r="3.2" fill="#E6D188" />
      <path
        d="M31 31.7l1.3 1.3 2.4-2.5"
        fill="none"
        stroke="#1E3D29"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BulkVisual({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <BadgeFrame clipId="trust-bulk-scene" />
      <g clipPath="url(#trust-bulk-scene)">
        <rect x="9.5" y="11.5" width="12" height="8" rx="1" fill="#2A5238" />
        <rect x="14.3" y="11.5" width="2.8" height="8" fill="#E6D188" />
        <rect x="9.5" y="11.5" width="12" height="8" rx="1" fill="none" stroke="#1E3D29" strokeWidth="1" />
        <path d="M9.5 14h12" stroke="#E6D188" strokeWidth="0.8" />
        <rect x="25.5" y="13" width="10" height="7" rx="1" fill="#356747" />
        <rect x="29.4" y="13" width="2.4" height="7" fill="#E6D188" />
        <rect x="25.5" y="13" width="10" height="7" rx="1" fill="none" stroke="#1E3D29" strokeWidth="1" />
        <rect x="13" y="20" width="18" height="11.5" rx="1" fill="#E6D188" />
        <rect x="13" y="20" width="18" height="11.5" rx="1" fill="none" stroke="#1E3D29" strokeWidth="1.2" />
        <rect x="20.6" y="20" width="3.4" height="11.5" fill="#356747" />
        <path d="M13 24h18M13 28h18" stroke="#C0A054" strokeWidth="1" />
        <path d="M13 20l2.4-2.6h13.2L31 20" fill="none" stroke="#1E3D29" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M16 33.5h16" stroke="#1E3D29" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 2" opacity="0.6" />
      </g>
      <circle cx="31.8" cy="32.8" r="4.6" fill="#356747" stroke="#E6D188" strokeWidth="1.2" />
      <path
        d="M30 32.7l1.3 1.3 2.4-2.5"
        fill="none"
        stroke="#E6D188"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.5 10.5l.75 1.5 1.65.25-1.2 1.15.3 1.65-1.5-.8-1.5.8.3-1.65-1.2-1.15 1.65-.25z" fill="#C0A054" stroke="#1E3D29" strokeWidth="0.5" />
    </svg>
  );
}

function DeliveryVisual({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <BadgeFrame clipId="trust-delivery-scene" />
      <g clipPath="url(#trust-delivery-scene)">
        <path d="M6.5 15h4.5M6.5 18.5h6M6.5 22h4.5" stroke="#C0A054" strokeWidth="1.3" strokeLinecap="round" />
        <rect x="12" y="16.5" width="14" height="9" rx="1" fill="#356747" />
        <rect x="12" y="16.5" width="14" height="9" rx="1" fill="none" stroke="#1E3D29" strokeWidth="1.2" />
        <path d="M12 19.5h14M12 22.8h14" stroke="#E6D188" strokeWidth="0.9" />
        <rect x="15" y="16.5" width="2.6" height="9" fill="#1E3D29" opacity="0.45" />
        <path d="M26 19h4.2l3.2 3.2v3.3H26z" fill="#2A5238" />
        <rect x="27" y="20" width="2.6" height="2" rx="0.5" fill="#fff" opacity="0.92" />
        <circle cx="16" cy="28" r="2.7" fill="#1E3D29" />
        <circle cx="16" cy="28" r="1" fill="#E6D188" />
        <circle cx="29.5" cy="28" r="2.7" fill="#1E3D29" />
        <circle cx="29.5" cy="28" r="1" fill="#E6D188" />
        <path d="M9.5 32.5h11" stroke="#1E3D29" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4 2.6" />
        <path
          d="M35.2 10.5l3.5 1.3v2.9c0 2.3-1.6 3.9-3.5 4.7-1.9-.8-3.5-2.4-3.5-4.7v-2.9z"
          fill="#E6D188"
          stroke="#1E3D29"
          strokeWidth="1.1"
        />
        <path
          d="M33.9 14.4l1.05 1.05 1.95-2.05"
          fill="none"
          stroke="#1E3D29"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

import { getContent } from "@/lib/db";

const VISUALS = [ExperienceVisual, CustomersVisual, BulkVisual, DeliveryVisual];

const DEFAULT_STATS = [
  { value: "25+", label: "Years Experience" },
  { value: "1000+", label: "Customers" },
  { value: "Bulk", label: "Supply" },
  { value: "Reliable", label: "Delivery" },
];

export default function TrustStrip() {
  // Admin-managed stats (Admin → Home → Content → Trust Stats); falls back
  // to the default set when unsaved. Visuals stay fixed per position.
  const content = getContent();
  const stats =
    content.stats?.length === 4
      ? content.stats
      : content.stats?.length
        ? [...content.stats, ...DEFAULT_STATS].slice(0, 4)
        : DEFAULT_STATS;
  return (
    <section aria-label="Company highlights" className="border-b border-brand-line bg-white">
      <ul className="container-site grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4 lg:py-12">
        {stats.map((item, i) => {
          const Visual = VISUALS[i % VISUALS.length];
          return (
          <li key={item.label + i} className="flex items-center gap-3.5 lg:justify-center">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-transparent">
              <Visual className="h-14 w-14" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="flex items-center gap-1.5 text-lg font-bold text-brand-ink sm:text-xl">
                {item.value}
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-gold-dark" />
              </span>
              <span className="text-xs font-medium text-brand-muted sm:text-sm">{item.label}</span>
            </span>
          </li>
          );
        })}
      </ul>
    </section>
  );
}
