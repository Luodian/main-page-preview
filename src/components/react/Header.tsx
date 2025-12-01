import React, { useState, useEffect, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

interface MenuLink {
  path: string;
  title: string;
  is_external?: boolean;
}

interface HeaderProps {
  siteConfig: {
    title: string;
  };
  menuLinks: MenuLink[];
  currentPath: string;
}

const Header: React.FC<HeaderProps> = ({
  siteConfig,
  menuLinks,
  currentPath,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Refs for drawer and toggle button for React-style outside-click handling
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  // Close mobile menu when clicking outside, or when pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        id="main-header"
        className="fixed px-4 md:px-0 left-0 z-20 flex items-center md:relative top-0 h-16 w-full bg-bgColor md:bg-transparent overflow-hidden"
      >
        <div className="w-full justify-between sm:flex-col">
          <div className="flex items-center gap-x-2">
            {/* Logo */}
            <a
              aria-label={siteConfig.title}
              aria-current={currentPath === "/" ? "page" : false}
              className="group flex h-8 items-center hover:filter-none sm:relative md:ml-10"
              href="/"
            >
              <div className="text-2xl md:text-4xl font-bold text-slate-950">
                LMMs-Lab
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="ml-auto w-fit md:mr-10">
              <div className="top-4 md:top-8 -ml-[4.5rem] flex items-center space-x-4">
                <nav
                  aria-label="Main menu"
                  className="hidden md:flex items-center gap-x-6 font-medium text-xl mr-2"
                >
                  {menuLinks.map((link) => (
                    <a
                      key={link.path}
                      aria-current={currentPath === link.path ? "page" : false}
                      className="opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1 text-slate-950"
                      href={link.path}
                      target={link.is_external ? "_blank" : undefined}
                      rel={link.is_external ? "noopener noreferrer" : undefined}
                    >
                      {link.title}
                      {link.is_external && (
                        <HiArrowTopRightOnSquare className="h-5 w-5" />
                      )}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              id="toggle-nav-menu-mobile"
              ref={toggleButtonRef}
              aria-expanded={isMobileMenuOpen}
              aria-haspopup="menu"
              aria-label="Open main menu"
              className="group relative h-8 w-8 rounded-lg text-accent-base md:invisible md:hidden"
              type="button"
              onClick={toggleMobileMenu}
            >
              <HiMenu
                className={`absolute start-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transition-all ${
                  isMobileMenuOpen
                    ? "scale-0 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              />
              <HiX
                className={`absolute start-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transition-all ${
                  isMobileMenuOpen
                    ? "scale-100 opacity-100"
                    : "scale-0 opacity-0"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        id="drawer"
        ref={drawerRef}
        className={`fixed inset-0 z-10 ${isMobileMenuOpen ? "block" : "hidden"}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className={`absolute inset-0 transform bg-bgColor transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <nav
            aria-label="Mobile navigation menu"
            className="text-lg absolute inset-0 flex flex-col items-center justify-center gap-y-4 text-center font-medium text-accent-two"
          >
            {menuLinks.map((link) => (
              <a
                key={link.path}
                aria-current={currentPath === link.path ? "page" : false}
                className="underline-offset-2 hover:underline flex items-center gap-1"
                href={link.path}
                target={link.is_external ? "_blank" : undefined}
                rel={link.is_external ? "noopener noreferrer" : undefined}
                onClick={closeMobileMenu}
              >
                {link.title}
                {link.is_external && (
                  <HiArrowTopRightOnSquare className="h-5 w-5" />
                )}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
