"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-8">
      <div className="card p-10 max-w-md w-full text-center space-y-6 border-red-500/20">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-heading">Unexpected Error</h1>
          <p className="text-sm text-body leading-relaxed">
            The application encountered an unexpected error. Please try again.
          </p>
          {error.digest && (
            <p className="text-[10px] text-muted font-mono mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary py-2.5 px-6 rounded-xl text-sm flex items-center gap-2 justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/app"
            className="btn-secondary-dark py-2.5 px-6 rounded-xl text-sm flex items-center gap-2 justify-center"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
