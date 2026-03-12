"use client";

import { useEffect, useState, useRef } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: Readonly<TableOfContentsProps>) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    // Use IntersectionObserver to track which heading is in view
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting (visible)
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        } else {
          // If no heading is in view, find the last heading that is above the viewport
          const scrollY = window.scrollY;
          let currentId = "";
          for (const el of headingElements) {
            if (el.offsetTop <= scrollY + 100) {
              currentId = el.id;
            }
          }
          if (currentId) {
            setActiveId(currentId);
          }
        }
      },
      {
        rootMargin: "-60px 0px -70% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-8 border-l-2 border-[#F0F0F0] pl-4">
      <p className="text-[11px] font-medium tracking-[0.8px] uppercase text-[#BBBBBB] mb-3">
        On this page
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? "12px" : "0px" }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  // Update URL without scroll jump
                  globalThis.history.replaceState(null, "", `#${item.id}`);
                }
              }}
              className={`block text-[13px] leading-snug transition-colors duration-200 ${
                activeId === item.id
                  ? "text-[#1A1A1A] font-medium"
                  : "text-[#999999] hover:text-[#666666]"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
