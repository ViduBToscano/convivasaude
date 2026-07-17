"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Pula o primeiro render: o pageview inicial ja e disparado pelo
    // container GTM e pelo fbq('track','PageView') do snippet inline.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const qs = searchParams?.toString();
    const page_path = qs ? `${pathname}?${qs}` : pathname;

    // Adia um frame para que o title assincrono do App Router ja
    // esteja atualizado antes de ler document.title.
    const id = requestAnimationFrame(() => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page_path,
        page_location: window.location.href,
        page_title: document.title,
      });

      if (typeof window.fbq === "function") {
        window.fbq("track", "PageView");
      }
    });

    return () => cancelAnimationFrame(id);
  }, [pathname, searchParams]);

  return null;
}

export default function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
