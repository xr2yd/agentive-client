import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-8">
      <div className="card p-10 max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-blue/10 border border-blue/20 text-cyan flex items-center justify-center mx-auto">
          <SearchX className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-heading">404</h1>
          <h2 className="text-xl font-bold text-heading">Page Not Found</h2>
          <p className="text-sm text-body leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <Link
          href="/app"
          className="btn-primary py-2.5 px-6 rounded-xl text-sm flex items-center gap-2 justify-center mx-auto w-fit"
        >
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
