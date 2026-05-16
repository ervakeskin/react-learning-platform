interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header className="header">
      <div className="container header-inner">
        <p className="brand">Samsun Üniversitesi | Yazılım Mühendisliği</p>
        <div className="header-row">
          <p className="site-title">{title}</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
