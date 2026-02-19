import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "株式会社コグミル コーポレートサイト",
    short_name: "コグミル",
    description: "AI・業務改善ソリューションを提供する株式会社コグミルの公式サイト",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7fa",
    theme_color: "#f5f7fa",
    lang: "ja",
  }
}
