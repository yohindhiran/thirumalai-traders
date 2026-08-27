"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { whatsappHref } from "@/lib/utils";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {!visible && null}
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss WhatsApp button"
        className="absolute -left-2 -top-2 hidden rounded-full border border-brand-line bg-white p-1 text-brand-muted shadow-card hover:text-brand-ink sm:block"
      >
        <X className="h-3 w-3" />
      </button>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lift transition-transform hover:scale-105"
      >
        <MessageCircle className="h-7 w-7 text-white" aria-hidden="true" />
      </a>
    </div>
  );
}
