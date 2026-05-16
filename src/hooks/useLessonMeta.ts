import { useEffect } from "react";

export function useLessonMeta(slug: string, title: string, summary?: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | React (TSX) Eğitim`;

    let meta = document.querySelector('meta[name="description"]');
    const prevContent = meta?.getAttribute("content") ?? "";
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", summary?.slice(0, 160) ?? `${title} dersi — React öğrenme platformu.`);

    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevContent);
    };
  }, [slug, title, summary]);
}
