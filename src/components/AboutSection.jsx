import "./AboutSection.css";
import gauntlet from "../assets/gauntlet.gif";
/*
  Put your GIF in  public/assets/  and set its file name here.
  (Your screenshot shows a broken image icon because the file is not at this path yet.)
  You can also paste a direct GIPHY media URL, e.g.
  "https://media.giphy.com/media/<ID>/giphy.gif"
*/

/* Red parallelogram "slashes" used as HUD decoration */
function Slashes({ count = 4, className = "" }) {
  const step = 44;
  return (
    <svg
      className={`about-slashes ${className}`}
      viewBox={`0 0 34 ${count * step}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => {
        const y = i * step;
        return (
          <polygon
            key={i}
            points={`0,${y + 36} 34,${y} 34,${y + 14} 0,${y + 50}`}
            fill="#ff393f"
          />
        );
      })}
    </svg>
  );
}

/* Thin circuit-style connector lines */
function Circuit({ variant, className = "" }) {
  const paths = {
    left: "M40 0 V90 L8 122 V250 L40 282 V330",
    right: "M0 40 H70 L100 70 V180",
    top: "M0 0 V60 M14 0 V40 M28 0 V20",
  };
  return (
    <svg
      className={`about-circuit ${className}`}
      viewBox="0 0 110 340"
      aria-hidden="true"
    >
      <path d={paths[variant]} fill="none" stroke="#f3f6dc" strokeWidth="1.4" />
    </svg>
  );
}

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      {/* HUD decoration (hidden on small screens) */}
      <Slashes count={5} className="about-deco about-deco--left" />
      <Slashes count={4} className="about-deco about-deco--right" />
      <Circuit variant="left" className="about-deco about-deco--circuit-left" />
      <Circuit
        variant="right"
        className="about-deco about-deco--circuit-right"
      />
      <Slashes count={3} className="about-deco about-deco--right-mid" />
      <span
        className="about-deco about-tick about-tick--c"
        aria-hidden="true"
      />
      <span className="about-deco about-box" aria-hidden="true" />
      <span
        className="about-deco about-tick about-tick--a"
        aria-hidden="true"
      />
      <span
        className="about-deco about-tick about-tick--b"
        aria-hidden="true"
      />

      <div className="about-section__inner">
        {/* Top-left: stacked title */}
        <div className="stack stack--title about-title">
          <h2 className="stack__face about-title__text">
            about <em>NITSHACKS-9.0</em>
          </h2>
        </div>

        {/* Centre: animated gauntlet */}
        <div className="about-gauntlet">
          <img src={gauntlet} alt="NITSHACKS gauntlet animation" />
        </div>

        {/* Right: description */}
        <div className="stack stack--description about-description">
          <div className="stack__face about-description__content">
            <p>
              NITS HACKS is a platform for innovation, creativity, collaboration
              and problem-solving.
            </p>
            <p>
              Bring your ideas to life, work with talented people, and build
              solutions that make a difference.
            </p>
          </div>
        </div>

        {/* Bottom-right: HACKS badge (text, no image needed) */}
        <div className="stack stack--brand about-brand">
          <div className="stack__face about-brand__text">HACKS</div>
        </div>
      </div>
    </section>
  );
}
