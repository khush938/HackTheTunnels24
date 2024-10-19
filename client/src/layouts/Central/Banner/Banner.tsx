import "./Banner.style.scss";

function Banner() {
  return (
    <div className="Banner">
      <img src="/carleton_logo.png" alt="Carleton Logo" />
      <div className="Banner__separator"></div>
      <div>
        <div className="Banner__title">Carleton Central</div>
        <div className="Banner__subtitle">Welcome to Your Student Portal</div>
      </div>
    </div>
  );
}

export default Banner;
