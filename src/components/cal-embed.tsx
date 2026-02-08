"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "25min" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#1a1a1a" },
          dark: { "cal-brand": "#fafaf9" },
        },
        hideEventTypeDetails: false,
        layout: "week_view",
      });
    })();
  }, []);

  return (
    <Cal
      namespace="25min"
      calLink="revenue-engineer/25min"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "week_view", useSlotsViewOnSmallScreen: "true" }}
    />
  );
}
