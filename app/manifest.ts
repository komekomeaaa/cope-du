import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cogmiru Inc. コーポレートサイト",
    short_name: "Cogmiru",
    description: "AI・業務改善ソリューションを提供するCogmiru Inc.の公式サイト",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7fa",
    theme_color: "#f5f7fa",
    lang: "ja",
  }
}
