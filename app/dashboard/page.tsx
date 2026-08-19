"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Loader2 } from "lucide-react";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to student dashboard by default
    router.replace("/student/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg animate-pulse">
          <GraduationCap className="h-7 w-7" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold">GlobeDk Elite Academy</h2>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            Loading your dashboard...
          </p>
        </div>
      </div>
    </div>
  );
}
