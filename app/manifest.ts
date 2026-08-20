import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

const manifest = (): MetadataRoute.Manifest => ({
  name: `${profile.name} — Front-end Lead`,
  short_name: profile.name,
  description: profile.summary.pt,
  start_url: "/pt",
  display: "standalone",
  background_color: "#f8f4ec",
  theme_color: "#f8f4ec",
  icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
});

export default manifest;
