"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Basic client-side route protection
    if (!isAuthenticated) {
      router.push("/login?callbackUrl=" + encodeURIComponent(pathname));
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, router, pathname]);

  if (isChecking || !isAuthenticated) {
    return (
      <div style={{ height: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#131313" }}>
        <Loader2 size={32} color="#39FF14" style={{ animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return <>{children}</>;
}
