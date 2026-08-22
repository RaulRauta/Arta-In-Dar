"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function isInternalNavigation(anchor: HTMLAnchorElement) {
  if (anchor.target && anchor.target !== "_self") {
    return false;
  }

  if (anchor.hasAttribute("download")) {
    return false;
  }

  const href = anchor.getAttribute("href");

  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  const url = new URL(anchor.href);

  if (url.origin !== window.location.origin) {
    return false;
  }

  const currentUrl = new URL(window.location.href);
  const sameUrl =
    url.pathname === currentUrl.pathname &&
    url.search === currentUrl.search &&
    url.hash === currentUrl.hash;
  const onlyHashChanges =
    url.pathname === currentUrl.pathname &&
    url.search === currentUrl.search &&
    url.hash !== currentUrl.hash;

  return !sameUrl && !onlyHashChanges;
}

export function NavigationTransition() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function finishNavigation() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsNavigating(false);
        document.documentElement.removeAttribute("data-route-pending");
      }, 260);
    }

    finishNavigation();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || isModifiedClick(event)) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a");

      if (!anchor || !isInternalNavigation(anchor)) {
        return;
      }

      setIsNavigating(true);
      document.documentElement.setAttribute("data-route-pending", "true");

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsNavigating(false);
        document.documentElement.removeAttribute("data-route-pending");
      }, 4500);
    }

    window.addEventListener("click", handleClick, { capture: true });

    return () => {
      window.removeEventListener("click", handleClick, { capture: true });
      document.documentElement.removeAttribute("data-route-pending");
    };
  }, []);

  return (
    <div
      className={`navigation-transition${isNavigating ? " navigation-transition--active" : ""}`}
      aria-hidden="true"
    >
      <span className="navigation-transition__line" />
      <span className="navigation-transition__glow" />
    </div>
  );
}
