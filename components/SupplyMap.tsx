"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Layers,
  MapPin,
  Navigation,
  Plus,
  Minus,
  Sparkles,
  Truck,
} from "lucide-react";

interface LocationPin {
  id: string;
  name: string;
  badge: string;
  role: string;
  description: string;
  x: number; // percentage from left
  y: number; // percentage from top
  isHQ?: boolean;
}

const LOCATIONS: LocationPin[] = [
  {
    id: "erode",
    name: "Erode",
    badge: "Central HQ",
    role: "Main Wholesale Distribution Hub",
    description: "Karungalpalayam central warehouse — daily bulk order dispatches.",
    x: 52,
    y: 45,
    isHQ: true,
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    badge: "Daily Supply",
    role: "Canteen & Commercial Kitchens",
    description: "Direct wholesale grocery supply to colleges, canteens & industries.",
    x: 16,
    y: 58,
  },
  {
    id: "tirupur",
    name: "Tirupur",
    badge: "Daily Supply",
    role: "Textile Mills & Food Centers",
    description: "Bulk dals, spices, rice and oils delivered daily to mills & canteens.",
    x: 35,
    y: 51,
  },
  {
    id: "salem",
    name: "Salem",
    badge: "Daily Supply",
    role: "Wholesale Markets & Retailers",
    description: "Supplying bulk grocery essentials, dry fruits & spices across Salem.",
    x: 82,
    y: 26,
  },
  {
    id: "namakkal",
    name: "Namakkal",
    badge: "Daily Supply",
    role: "Institutions & Catering Units",
    description: "Regular wholesale deliveries to schools, colleges & mess kitchens.",
    x: 77,
    y: 66,
  },
];

export default function SupplyMap() {
  const [activeLoc, setActiveLoc] = useState<LocationPin>(LOCATIONS[0]);
  const [viewMode, setViewMode] = useState<"pinned" | "google">("pinned");
  const [zoomLevel, setZoomLevel] = useState(1);

  const googleMapsUrl = `https://www.google.com/maps/dir/Coimbatore,+Tamil+Nadu/Tiruppur,+Tamil+Nadu/Erode,+Tamil+Nadu/Salem,+Tamil+Nadu/Namakkal,+Tamil+Nadu`;

  return (
    <div className="card overflow-hidden border border-brand-line shadow-card bg-white">
      {/* Title Header */}
      <div className="border-b border-brand-line bg-gradient-to-r from-emerald-50/80 via-white to-brand-cream/60 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600">
                <MapPin className="h-3.5 w-3.5 fill-red-600" />
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Distribution Network
              </p>
            </div>
            <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-brand-ink">
              We Are Supply Across
            </h3>
            <p className="mt-0.5 text-xs text-brand-muted">
              Pinned wholesale supply coverage across Western Tamil Nadu
            </p>
          </div>

          {/* View toggle (Pinned Map vs Live Google Map) */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-brand-line bg-white p-1 text-xs shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode("pinned")}
              className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                viewMode === "pinned"
                  ? "bg-brand-green text-white shadow-sm"
                  : "text-brand-muted hover:text-brand-ink"
              }`}
            >
              Pinned Locations
            </button>
            <button
              type="button"
              onClick={() => setViewMode("google")}
              className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                viewMode === "google"
                  ? "bg-brand-green text-white shadow-sm"
                  : "text-brand-muted hover:text-brand-ink"
              }`}
            >
              Live Map
            </button>
          </div>
        </div>
      </div>

      {/* Map Body */}
      {viewMode === "google" ? (
        <div className="relative aspect-[4/3] w-full bg-gray-100 sm:aspect-[16/10]">
          <iframe
            title="Thirumalaai Traders Supply Region - Erode and Surrounding Districts"
            src="https://maps.google.com/maps?q=Erode,+Tamil+Nadu&t=&z=9&ie=UTF8&iwloc=&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
            allowFullScreen
          />
          <div className="absolute bottom-3 right-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-brand-ink shadow-md hover:text-brand-green"
            >
              <span>View Route in Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      ) : (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8ecef] sm:aspect-[16/10] select-none">
          {/* Authentic Google Maps Stylized Canvas */}
          <svg
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 500"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Land terrain styling */}
              <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3f1e7" />
                <stop offset="50%" stopColor="#edf0eb" />
                <stop offset="100%" stopColor="#f5f3ec" />
              </linearGradient>

              {/* Cauvery River Gradient */}
              <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9ec9eb" />
                <stop offset="100%" stopColor="#b6daf2" />
              </linearGradient>

              {/* Forest / reserve green spots */}
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0ded6" strokeWidth="0.6" />
              </pattern>
            </defs>

            {/* Base land */}
            <rect width="800" height="500" fill="url(#mapBg)" />
            <rect width="800" height="500" fill="url(#grid)" opacity="0.4" />

            {/* Green terrain regions (Western Ghats & Hills) */}
            <path
              d="M 0,0 L 220,0 Q 200,120 120,200 Q 60,320 0,400 Z"
              fill="#d9eccb"
              opacity="0.6"
            />
            <path
              d="M 680,0 L 800,0 L 800,180 Q 720,130 680,0 Z"
              fill="#d9eccb"
              opacity="0.5"
            />
            <path
              d="M 720,380 Q 760,420 800,450 L 800,500 L 680,500 Z"
              fill="#d9eccb"
              opacity="0.5"
            />

            {/* Cauvery River & Tributaries (Bhavani River joining Cauvery at Erode) */}
            <path
              d="M 320,0 Q 380,120 440,210 Q 430,240 460,250 Q 520,260 580,310 Q 620,380 660,500"
              fill="none"
              stroke="url(#riverGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M 220,180 Q 340,200 440,210"
              fill="none"
              stroke="url(#riverGrad)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <text x="590" y="340" fill="#7fa6c6" fontSize="10" fontStyle="italic" fontWeight="600">
              Cauvery River
            </text>

            {/* Secondary roads / District connections */}
            <path
              d="M 130,290 L 416,225 M 280,255 L 616,330 M 416,225 L 656,130 M 416,225 L 616,330 M 280,255 L 656,130"
              fill="none"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 130,290 L 416,225 M 280,255 L 616,330 M 416,225 L 656,130 M 416,225 L 616,330 M 280,255 L 656,130"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Primary NH-544 (Salem - Erode - Tirupur - Coimbatore Corridor) - Golden Highway */}
            <path
              d="M 130,290 Q 200,270 280,255 Q 350,240 416,225 Q 540,175 656,130"
              fill="none"
              stroke="#fcd34d"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M 130,290 Q 200,270 280,255 Q 350,240 416,225 Q 540,175 656,130"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Highway Label */}
            <rect x="310" y="222" width="56" height="15" rx="3" fill="#ffffff" stroke="#f59e0b" strokeWidth="1" />
            <text x="316" y="233" fill="#92400e" fontSize="9" fontWeight="700">
              NH 544
            </text>

            {/* Erode to Namakkal Connection Line */}
            <path
              d="M 416,225 Q 510,280 616,330"
              fill="none"
              stroke="#fcd34d"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Service Radius Indicator from Erode (Pulsing radar ring) */}
            <circle
              cx="416"
              cy="225"
              r="170"
              fill="none"
              stroke="#059669"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.3"
            />
          </svg>

          {/* Google Maps Top Search & Overlay controls */}
          <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-brand-ink shadow-md backdrop-blur border border-brand-line">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Kongu Wholesale Supply Belt</span>
            </div>
          </div>

          <div className="absolute right-3 top-3 z-10 flex flex-col gap-1">
            <div className="flex rounded-md bg-white shadow-md border border-brand-line overflow-hidden">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.2, z + 0.1))}
                aria-label="Zoom in"
                className="p-1.5 text-gray-700 hover:bg-gray-100 transition"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
              <div className="w-[1px] bg-gray-200" />
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.9, z - 0.1))}
                aria-label="Zoom out"
                className="p-1.5 text-gray-700 hover:bg-gray-100 transition"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* 5 RED GOOGLE MAPS LOCATION PINS */}
          {LOCATIONS.map((loc) => {
            const isSelected = activeLoc.id === loc.id;
            return (
              <div
                key={loc.id}
                style={{
                  left: `${loc.x}%`,
                  top: `${loc.y}%`,
                  transform: "translate(-50%, -100%)",
                }}
                className="absolute z-20 cursor-pointer transition-all duration-300"
                onClick={() => setActiveLoc(loc)}
              >
                {/* Pulse beacon below marker */}
                <div className="relative flex items-center justify-center">
                  <span
                    className={`absolute -bottom-1 h-4 w-4 rounded-full ${
                      loc.isHQ ? "bg-emerald-500/40" : "bg-red-500/40"
                    } animate-ping`}
                  />
                  <span
                    className={`absolute -bottom-1 h-3 w-3 rounded-full ${
                      loc.isHQ ? "bg-emerald-600" : "bg-red-600"
                    } opacity-75`}
                  />

                  {/* Classic Red Google Maps Location Pin Marker */}
                  <div className="relative group transition-transform duration-200 hover:scale-125">
                    <svg
                      width="34"
                      height="46"
                      viewBox="0 0 34 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="drop-shadow-lg"
                    >
                      {/* Teardrop Pin Path */}
                      <path
                        d="M17 0C7.61116 0 0 7.61116 0 17C0 29.75 17 46 17 46C17 46 34 29.75 34 17C34 7.61116 26.3888 0 17 0Z"
                        fill={loc.isHQ ? "url(#hqPinGrad)" : "url(#redPinGrad)"}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      {/* Center White Circle */}
                      <circle cx="17" cy="16" r="6" fill="#ffffff" />
                      {/* Inner Dot */}
                      <circle
                        cx="17"
                        cy="16"
                        r="3"
                        fill={loc.isHQ ? "#047857" : "#dc2626"}
                      />

                      <defs>
                        <linearGradient id="redPinGrad" x1="17" y1="0" x2="17" y2="46" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ef4444" />
                          <stop offset="1" stopColor="#b91c1c" />
                        </linearGradient>
                        <linearGradient id="hqPinGrad" x1="17" y1="0" x2="17" y2="46" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#059669" />
                          <stop offset="1" stopColor="#065f46" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Star icon badge on HQ Pin */}
                    {loc.isHQ && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-amber-950 font-bold text-[9px] shadow">
                        ★
                      </span>
                    )}
                  </div>
                </div>

                {/* Location Name Pill Tag */}
                <div
                  className={`mt-1 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-extrabold shadow-md transition-all ${
                    isSelected
                      ? "bg-brand-ink text-white ring-2 ring-emerald-500 scale-105"
                      : "bg-white/95 text-brand-ink border border-gray-200"
                  }`}
                >
                  {loc.name}
                </div>
              </div>
            );
          })}

          {/* Bottom Left Google Watermark style */}
          <div className="absolute bottom-2 left-3 z-10 flex items-center gap-1.5 text-[11px] font-semibold text-gray-500/80 bg-white/70 px-2 py-0.5 rounded shadow-sm backdrop-blur">
            <span className="font-bold text-[#4285F4]">G</span>
            <span className="font-bold text-[#EA4335]">o</span>
            <span className="font-bold text-[#FBBC05]">o</span>
            <span className="font-bold text-[#4285F4]">g</span>
            <span className="font-bold text-[#34A853]">l</span>
            <span className="font-bold text-[#EA4335]">e</span>
            <span className="text-[10px] ml-1 font-normal text-gray-500">Maps View</span>
          </div>

          {/* Direct link out */}
          <div className="absolute bottom-2 right-3 z-10">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-green hover:underline bg-white/90 px-2.5 py-1 rounded shadow-sm"
            >
              Open in Maps
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}

      {/* Interactive Location Information Card */}
      <div className="border-t border-brand-line bg-gradient-to-r from-brand-mist/50 via-white to-brand-cream/50 p-4">
        {/* District Selector Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="text-xs font-bold text-brand-muted mr-1">Locations:</span>
          {LOCATIONS.map((loc) => {
            const isSelected = activeLoc.id === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => setActiveLoc(loc)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  isSelected
                    ? "bg-brand-green text-white shadow-sm ring-1 ring-brand-green"
                    : "border border-brand-line bg-white text-brand-ink hover:border-emerald-300"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    loc.isHQ ? "bg-amber-400" : "bg-red-500"
                  }`}
                />
                {loc.name}
              </button>
            );
          })}
        </div>

        {/* Selected Location Info Box */}
        <div className="rounded-xl border border-emerald-100 bg-white p-3.5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-200">
              <MapPin className="h-5 w-5 fill-red-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-brand-ink">{activeLoc.name}</h4>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                    activeLoc.isHQ
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {activeLoc.badge}
                </span>
                <span className="text-[11px] font-medium text-brand-muted">
                  · {activeLoc.role}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-brand-muted">
                {activeLoc.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-brand-line pt-2 sm:pt-0 sm:pl-4">
            <Truck className="h-4 w-4 text-emerald-700 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-brand-ink">Daily Wholesale Dispatch</span>
              <p className="text-[11px] text-brand-muted">Within 24 Hours Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
