"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-4 flex items-center justify-between border-b border-[#F0F0F0]">
        {/* Logo */}
        <Link href="/" className="text-[17px] font-semibold tracking-[-0.5px] text-[#1A1A1A]">
          mitaa.dev
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded text-[13px] font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-[#1A1A1A]"
                    : "text-[#999999] hover:text-[#1A1A1A]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#999999] hover:text-[#1A1A1A] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-b border-[#F0F0F0] bg-white/98">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded text-[14px] font-medium transition-colors ${
                    isActive
                      ? "text-[#1A1A1A]"
                      : "text-[#999999] hover:text-[#1A1A1A]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
