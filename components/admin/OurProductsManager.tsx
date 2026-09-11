"use client";

import RefProductsManager from "@/components/admin/RefProductsManager";

export default function OurProductsManager() {
  return (
    <RefProductsManager title="Our Products" endpoint="/api/admin/our-products" />
  );
}
