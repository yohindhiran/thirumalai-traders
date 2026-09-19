function ExperienceVisual({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#D9CB3A" />
      <circle cx="24" cy="24" r="22" fill="none" stroke="#1E3D29" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="18.5" fill="#1E3D29" />
      <circle cx="24" cy="24" r="15" fill="#F1E564" />
      <circle cx="24" cy="24" r="12.5" fill="#FFFDF2" />
      <path d="M11 15a16 16 0 0 1 11-6.5" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
      <circle cx="24" cy="4.6" r="1.3" fill="#1E3D29" />
      <circle cx="24" cy="43.4" r="1.3" fill="#1E3D29" />
      <path d="M24 13.2l1 2 2.2.35-1.6 1.55.4 2.2-1.95-1.05-1.95 1.05.4-2.2-1.6-1.55 2.2-.35z" fill="#D9CB3A" stroke="#1E3D29" strokeWidth="0.5" />
      <text
        x="24"
        y="31.5"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="13"
        fill="#1E3D29"
      >
        25
      </text>
      <path d="M15.5 34.5c2.6 1.8 5.5 2.6 8.5 2.6s5.9-.8 8.5-2.6" fill="none" stroke="#D9CB3A" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="15" cy="34" r="1" fill="#356747" />
      <circle cx="33" cy="34" r="1" fill="#356747" />
    </svg>
  );
}

function CustomersVisual({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#D9CB3A" />
      <circle cx="24" cy="24" r="22" fill="none" stroke="#1E3D29" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="18.5" fill="#356747" />
      <circle cx="24" cy="24" r="15" fill="#F1E564" />
      <clipPath id="trust-customers-scene">
        <circle cx="24" cy="24" r="12.5" />
      </clipPath>
      <circle cx="24" cy="24" r="12.5" fill="#EFF6F0" />
      <g clipPath="url(#trust-customers-scene)">
        <circle cx="14.5" cy="21" r="3.6" fill="#D9CB3A" />
        <path d="M8 33.5c0-4 2.8-6.2 6.5-6.2s6.5 2.2 6.5 6.2v3H8z" fill="#D9CB3A" />
        <circle cx="33.5" cy="21" r="3.6" fill="#D9CB3A" />
        <path d="M27 33.5c0-4 2.8-6.2 6.5-6.2s6.5 2.2 6.5 6.2v3H27z" fill="#D9CB3A" />
        <circle cx="24" cy="19.5" r="4.8" fill="#356747" />
        <path d="M13.5 35.5c0-5 4.2-7.8 10.5-7.8s10.5 2.8 10.5 7.8v3h-21z" fill="#356747" />
        <path d="M13.5 35.5c0-5 4.2-7.8 10.5-7.8s10.5 2.8 10.5 7.8" fill="none" stroke="#1E3D29" strokeWidth="1.2" />
        <circle cx="24" cy="19.5" r="4.8" fill="none" stroke="#1E3D29" strokeWidth="1.2" />
        <path d="M18 13.5a8 8 0 0 1 5-2.4" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      </g>
      <path d="M11 15a16 16 0 0 1 11-6.5" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
      <circle cx="24" cy="4.6" r="1.3" fill="#1E3D29" />
      <circle cx="24" cy="43.4" r="1.3" fill="#1E3D29" />
    </svg>
  );
}

function BulkVisual({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#D9CB3A" />
      <circle cx="24" cy="24" r="22" fill="none" stroke="#1E3D29" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="18.5" fill="#1E3D29" />
      <circle cx="24" cy="24" r="15" fill="#F1E564" />
      <clipPath id="trust-bulk-scene">
        <circle cx="24" cy="24" r="12.5" />
      </clipPath>
      <circle cx="24" cy="24" r="12.5" fill="#EFF6F0" />
      <g clipPath="url(#trust-bulk-scene)">
        <rect x="11" y="13" width="12" height="8" rx="1" fill="#2A5238" />
        <rect x="15.6" y="13" width="2.8" height="8" fill="#F1E564" />
        <rect x="11" y="13" width="12" height="8" rx="1" fill="none" stroke="#1E3D29" strokeWidth="1" />
        <rect x="15" y="20.5" width="17" height="11" rx="1" fill="#F1E564" />
        <rect x="15" y="20.5" width="17" height="11" rx="1" fill="none" stroke="#1E3D29" strokeWidth="1.2" />
        <rect x="21.6" y="20.5" width="3.4" height="11" fill="#356747" />
        <path d="M15 24.5h17M15 28.5h17" stroke="#D9CB3A" strokeWidth="1" />
        <path d="M15 20.5l2-2.5h12l3 2.5" fill="none" stroke="#1E3D29" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="32" cy="14.5" r="1.4" fill="#356747" />
      </g>
      <path d="M11 15a16 16 0 0 1 11-6.5" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
      <circle cx="24" cy="4.6" r="1.3" fill="#1E3D29" />
      <circle cx="24" cy="43.4" r="1.3" fill="#1E3D29" />
    </svg>
  );
}

function DeliveryVisual({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#D9CB3A" />
      <circle cx="24" cy="24" r="22" fill="none" stroke="#1E3D29" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="18.5" fill="#356747" />
      <circle cx="24" cy="24" r="15" fill="#F1E564" />
      <clipPath id="trust-delivery-scene">
        <circle cx="24" cy="24" r="12.5" />
      </clipPath>
      <circle cx="24" cy="24" r="12.5" fill="#EFF6F0" />
      <g clipPath="url(#trust-delivery-scene)">
        <rect x="9" y="17.5" width="15" height="8.5" rx="1" fill="#356747" />
        <rect x="9" y="17.5" width="15" height="8.5" rx="1" fill="none" stroke="#1E3D29" strokeWidth="1.2" />
        <path d="M24 19.5h4.4l4 4v2.5H24z" fill="#2A5238" />
        <rect x="25" y="20.5" width="3" height="2.2" rx="0.5" fill="#fff" opacity="0.92" />
        <circle cx="13.5" cy="28" r="2.6" fill="#1E3D29" />
        <circle cx="13.5" cy="28" r="1" fill="#fff" />
        <circle cx="27" cy="28" r="2.6" fill="#1E3D29" />
        <circle cx="27" cy="28" r="1" fill="#fff" />
        <path d="M8 32h26" stroke="#D9CB3A" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 2.6" />
        <path
          d="M31.5 11.5l3.6 1.3v2.9c0 2.3-1.6 3.9-3.6 4.6-2-.7-3.6-2.3-3.6-4.6v-2.9z"
          fill="#F1E564"
          stroke="#1E3D29"
          strokeWidth="1.1"
        />
        <path
          d="M30 15.2l1.1 1.1 2-2.1"
          fill="none"
          stroke="#1E3D29"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path d="M11 15a16 16 0 0 1 11-6.5" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
      <circle cx="24" cy="4.6" r="1.3" fill="#1E3D29" />
      <circle cx="24" cy="43.4" r="1.3" fill="#1E3D29" />
    </svg>
  );
}

const ITEMS = [
  { Visual: ExperienceVisual, value: "25+", label: "Years Experience" },
  { Visual: CustomersVisual, value: "1000+", label: "Customers" },
  { Visual: BulkVisual, value: "Bulk", label: "Supply" },
  { Visual: DeliveryVisual, value: "Reliable", label: "Delivery" },
];

export default function TrustStrip() {
  return (
    <section aria-label="Company highlights" className="border-b border-brand-line bg-white">
      <ul className="container-site grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4 lg:py-12">
        {ITEMS.map((item) => (
          <li key={item.label} className="flex items-center gap-3.5 lg:justify-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-transparent">
              <item.Visual className="h-12 w-12" />
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
