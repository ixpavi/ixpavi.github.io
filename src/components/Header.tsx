import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home } from "lucide-react";
import yatiMark from "@/assets/yati-mark-transparent.png";
import yatiText from "@/assets/yati-text-transparent.png";

const LOGO_EASTER_EGG_CLICKS = 5;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [logoSpinning, setLogoSpinning] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const logoResetTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleLogoClick = (e: React.MouseEvent) => {
    setLogoSpinning(true);
    setTimeout(() => setLogoSpinning(false), 700);

    const next = logoClicks + 1;
    setLogoClicks(next);
    clearTimeout(logoResetTimer.current);
    logoResetTimer.current = setTimeout(() => setLogoClicks(0), 1500);

    // Already home — clicking the logo shouldn't reset the page, just spin it.
    if (location.pathname === "/") e.preventDefault();
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/catalog" },
    { name: "Brands", href: "/#brands" },
    { name: "About", href: "/about" },
    { name: "Industries", href: "/#industries" },
    { name: "Clients", href: "/#clients" },
    { name: "Contact", href: "/#contact" },
  ];

  // If a nav link points to a section on the homepage and we're already
  // there, smooth-scroll to it directly instead of letting React Router
  // re-navigate (which reset scroll to top before jumping, feeling like a
  // hard page reload). Cross-page hash links still fall through to Link's
  // normal navigation + useHashScroll's instant jump on the new page.
  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    const hashIndex = href.indexOf("#");

    if (hashIndex === -1) {
      // No hash — only special-cased for Home: if we're already on "/",
      // smooth-scroll back to the top instead of Link doing nothing.
      if (href === "/" && location.pathname === "/") {
        e.preventDefault();
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const targetPath = href.slice(0, hashIndex) || "/";
    if (location.pathname !== targetPath) return;

    e.preventDefault();
    setIsMenuOpen(false);
    const id = href.slice(hashIndex + 1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update the URL bar without going through React Router — using
      // navigate() here would change `location.hash`, which re-triggers
      // useHashScroll's effect and immediately snaps the page with an
      // instant jump, canceling the smooth scroll we just started.
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blueprint-deep border-b border-white/10 animate-slide-down">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo — styled as a title-block "company" field */}
          <Link to="/" onClick={handleLogoClick} className="relative flex items-center gap-3 group">
            <img
              src={yatiMark}
              alt="Yati International"
              className={`h-9 w-9 object-contain brightness-0 invert transition-transform group-hover:-rotate-12 ${
                logoSpinning ? "duration-700 ease-out" : "duration-300"
              }`}
              style={logoSpinning ? { transform: "rotate(360deg)" } : undefined}
            />
            <div className="hidden sm:flex flex-col justify-center border-l border-white/15 pl-3">
              <img src={yatiText} alt="Yati International Inc." className="h-5 w-auto brightness-0 invert" />
              <span className="mono-label text-[9px] text-yellow/80 mt-0.5">Est. 2004 · Parker Authorized</span>
            </div>
            {logoClicks >= LOGO_EASTER_EGG_CLICKS && (
              <span className="absolute left-0 -bottom-5 mono-label text-[9px] text-yellow whitespace-nowrap animate-fade-in">
                torque spec: nominal. thanks for clicking. 🔩
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) =>
              item.name === "Home" ? (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick(item.href)}
                  title="Home"
                  aria-label="Home"
                  className="text-white/70 hover:text-yellow transition-colors"
                >
                  <Home className="w-4 h-4" strokeWidth={1.75} />
                </Link>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick(item.href)}
                  className="mono-label text-[11px] text-white/70 hover:text-yellow transition-colors"
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          {/* CTA Button — stamp style */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/#contact"
              onClick={handleNavClick("/#contact")}
              className="mono-label text-[11px] bg-yellow text-blueprint-deep font-semibold px-4 py-2 hover:bg-white active:scale-95 transition-all"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-9 h-9 flex items-center justify-center text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation"
            aria-expanded={isMenuOpen}
          >
            <span className="relative block w-5 h-4">
              <span
                className={`absolute left-0 h-[2px] w-5 bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "top-[7px] rotate-45" : "top-0 rotate-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[2px] w-5 bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0 -translate-x-2" : "opacity-100 translate-x-0"
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-5 bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "top-[7px] -rotate-45" : "top-[14px] rotate-0"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile Navigation — always mounted so both open and close animate smoothly */}
        <div
          className={`lg:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
            isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="py-4 border-t border-white/10">
              <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="mono-label text-xs text-white/70 hover:text-yellow py-2.5 border-b border-white/5 last:border-0 flex items-center gap-2"
                  onClick={(e) => {
                    handleNavClick(item.href)(e);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name === "Home" && <Home className="w-3.5 h-3.5" strokeWidth={1.75} />}
                  {item.name}
                </Link>
              ))}
              <Link
                to="/#contact"
                className="mono-label text-[11px] text-center bg-yellow text-blueprint-deep font-semibold px-4 py-2.5 mt-3"
                onClick={(e) => {
                  handleNavClick("/#contact")(e);
                  setIsMenuOpen(false);
                }}
              >
                Request Quote
              </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

