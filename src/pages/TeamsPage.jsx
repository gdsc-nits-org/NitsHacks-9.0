import HeadCard from "../components/HeadCard";
import ComicCard from "../components/ComicCard";
import { coordinators, heads, coHeads } from "../data/team";
import "../App.css";

function Group({ id, title, people, Card, gridClass, variant = "" }) {
  return (
    <section className={`tp-group ${variant}`} aria-labelledby={id}>
      {title && (
        <h2 className="tp-group__title" id={id}>
          <span>{title}</span>
        </h2>
      )}
      <div className={`tp-grid ${gridClass}`}>
        {people.map((person, i) => (
          <Card key={`${person.name}-${i}`} person={person} />
        ))}
      </div>
    </section>
  );
}

export default function TeamsPage() {
  const headsAndCoHeads = [...heads, ...coHeads];

  return (
    <main className="tp-page">
      <div className="tp-filmstrip" aria-hidden="true">
        <span />
      </div>

      <div className="tp-page__content !pt-24 sm:!pt-28 md:!pt-32">
        <header className="tp-hero">
          <h1 className="tp-hero__title">
            <span className="tp-hero__word">Teams</span>
          </h1>
          <p className="tp-hero__sub">COORDINATORS</p>
        </header>

        <Group
          id="tp-coordinators"
          title=""
          people={coordinators}
          Card={HeadCard}
          gridClass="tp-grid--heads"
          variant="tp-group--heads"
        />

        <Group
          id="tp-heads"
          title="EVENT HEADS AND CO-HEADS"
          people={headsAndCoHeads}
          Card={ComicCard}
          gridClass="tp-grid--comic"
          variant="tp-group--members"
        />
      </div>
    </main>
  );
}
