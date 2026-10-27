import Agent from './Agent';
import ThemeToggle from './ThemeToggle';

const skills = [
  ['Backend', 'Python · Django · FastAPI · RESTful APIs · MySQL'],
  ['Frontend', 'React.js · JavaScript · Tailwind CSS · HTML5 · CSS3'],
  ['AI / ML', 'Deep Learning · Reinforcement Learning · NLP · LLMs · Scikit-learn · MATLAB'],
  ['Tools', 'Git · Linux · SQL · C++ · Google Analytics · Search Console · Power BI'],
];

const projects = [
  ['2026', 'Deep Q-Network (DQN) Agent', 'A reinforcement learning agent using epsilon-greedy exploration, experience replay and a target network, trained to maximize reward.'],
  ['2026', 'Product Price Display System', 'A price display feature for an online store, with structured product listings and a clearer product page layout.'],
  ['2025', 'Sentiment Analysis with Logistic Regression', 'Binary text classification in Python: preprocessing, feature extraction and model evaluation.'],
  ['2025', 'Regression, Classification & Clustering', 'Scikit-learn workflows, comparing the performance of different algorithms.'],
  ['2023', 'Airline Ticket Reservation System', 'A web app for flight search, schedules, pricing and the reservation flow, including the database design.'],
];

const jobs = [
  ['Jul 2023 – Dec 2025', 'Content Manager & Website Administrator', 'Cheshmgiran Co. · Remote', 'Maintained several company websites, and used Google Analytics and Search Console to track performance and indexing. Worked with the marketing team on content quality and engagement.'],
  ['Jul 2023 – Oct 2023', 'Frontend Developer Intern', 'Sanay Company · Zanjan', 'Built interfaces with HTML, CSS, Tailwind CSS and JavaScript.'],
];

export default function Page() {
  return (
    <main>
      <ThemeToggle />
      <header className="hero">
        <p className="role">Junior Software Developer, Backend Intern</p>
        <h1>Reyhaneh<br />Mohammadi</h1>
        <p className="lead">I build web backends and teach machines to make decisions. Right now I am looking for a backend internship.</p>
        <div className="stage">
          <Agent />
          <p className="cap">Live: a Q-learning agent (orange) learning to reach the goal (green). Brighter cells are higher learned value.</p>
        </div>
        <nav className="links">
          <a className="btn" href="mailto:ryhn.mohamadi@iasbs.ac.ir">Email me</a>
          <a className="btn ghost" href="https://github.com/Reyhane-Mohammadi" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </header>

      <Section title="About">
        <p className="big">M.Sc. student in Artificial Intelligence and Robotics, with a software engineering degree and real experience running websites. I want to bring that mix to web applications and AI-based products, and grow as a backend developer.</p>
      </Section>

      <Section title="Skills">
        <dl className="skills">
          {skills.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
      </Section>

      <Section title="Projects">
        <ul className="rows">
          {projects.map(([y, t, d]) => (
            <li key={t}><span className="yr">{y}</span><div><h3>{t}</h3><p>{d}</p></div></li>
          ))}
        </ul>
      </Section>

      <Section title="Experience">
        <ul className="rows timeline">
          {jobs.map(([when, t, where, d]) => (
            <li key={t}><span className="yr">{when}</span><div><h3>{t}</h3><p className="where">{where}</p><p>{d}</p></div></li>
          ))}
        </ul>
      </Section>

      <Section title="Education">
        <ul className="rows">
          <li><span className="yr">Oct 2025 – now</span><div><h3>M.Sc. Artificial Intelligence and Robotics</h3><p>Institute for Advanced Studies in Basic Sciences, Zanjan</p></div></li>
          <li><span className="yr">2020 – 2024</span><div><h3>B.Sc. Computer Engineering, Software</h3><p>Islamic Azad University of Zanjan</p></div></li>
        </ul>
        <p className="langs">Languages: Persian (native), English (intermediate)</p>
      </Section>

      <footer className="foot">
        <h2>Let&rsquo;s talk</h2>
        <a href="mailto:ryhn.mohamadi@iasbs.ac.ir">ryhn.mohamadi@iasbs.ac.ir</a>
        <a href="tel:+989101413591">(+98) 910 141 3591</a>
        <a href="https://github.com/Reyhane-Mohammadi" target="_blank" rel="noreferrer">github.com/Reyhane-Mohammadi</a>
      </footer>
    </main>
  );
}

function Section({ title, children }) {
  return (<section className="sec"><h2>{title}</h2><div>{children}</div></section>);
}
