"use client";

import RefProductsManager from "@/components/admin/RefProductsManager";

export default function MostSellingManager() {
  return (
    <RefProductsManager title="Most Selling" endpoint="/api/admin/most-selling" />
  );
}
