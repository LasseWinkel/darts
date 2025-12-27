// src/hooks/usePreventRefresh.ts
import { useEffect } from "react";

export const usePreventRefresh = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [enabled]);
};
