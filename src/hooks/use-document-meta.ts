import { useEffect } from "react";

const DEFAULT_TITLE = "Yati International Inc. | Parker Hannifin Authorized Distributor India";
const DEFAULT_DESCRIPTION =
  "Yati International — authorized Parker Hannifin, NBC Bearing and Demech distributor in India since 2004. Genuine hydraulics, pneumatics, filtration, valves, bearings and industrial coatings for engineers and industrial plants.";

/**
 * Sets a page-specific <title> and meta description, since this is a
 * client-rendered SPA with a single static index.html — without this every
 * route would show the same title/description in search results. Resets to
 * the site default on unmount so navigating away doesn't leave stale meta.
 */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") ?? null;
    if (description && metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle || DEFAULT_TITLE;
      if (metaDescription && previousDescription !== null) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
}

export { DEFAULT_TITLE, DEFAULT_DESCRIPTION };
