import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Disable the browser's automatic scroll restoration on history changes —
// it fights our own in-app hash scrolling (see useHashScroll), snapping
// the page back to the top right after we've scrolled to a section.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(<App />);
