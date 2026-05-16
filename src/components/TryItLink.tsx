const FLAGSHIP_TRY_SLUGS = new Set([
  "react-usestate",
  "react-jsx-intro",
  "react-props",
  "react-forms",
  "react-router",
  "react-first-app",
]);

interface TryItLinkProps {
  slug: string;
  code?: string;
}

function TryItLink({ slug }: TryItLinkProps) {
  if (!FLAGSHIP_TRY_SLUGS.has(slug)) return null;

  const url = `https://stackblitz.com/fork/vitejs-vite-react-ts?title=${encodeURIComponent(slug)}`;

  return (
    <a className="try-it-link" href={url} target="_blank" rel="noreferrer" title="Kodu kopyalayıp editörde yapıştır">
      Try it — StackBlitz (yeni sekme)
    </a>
  );
}

export default TryItLink;
