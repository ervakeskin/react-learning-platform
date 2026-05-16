interface HeroProps {
  subtitle: string;
}

function Hero({ subtitle }: HeroProps) {
  return (
    <section className="hero">
      <div className="container">
        <p className="tag">Final Projesi | React + TypeScript (TSX)</p>
        <h2>Modern, Tip Güvenli ve Bileşen Tabanlı React Eğitim Platformu</h2>
        <p className="hero-text">{subtitle}</p>
      </div>
    </section>
  );
}

export default Hero;
