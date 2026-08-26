import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-blueprint-deep grid-blueprint px-4">
      <div className="text-center max-w-md">
        <div className="mono-label text-[11px] text-yellow/80 mb-6">Dwg No. 404 / Not Found</div>
        <h1 className="text-6xl font-display font-semibold text-white mb-4">404</h1>
        <p className="text-white/70 mb-10">
          This drawing doesn't exist in our register. The page you're looking for may have moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-yellow text-blueprint-deep hover:bg-white transition-colors font-semibold mono-label text-xs px-6 py-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
