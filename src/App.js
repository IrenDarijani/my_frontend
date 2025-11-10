

import React, { useState, useEffect } from "react";
import './App.css';
import myPhoto from './images/my_photo.jpg';
import topImage from './images/top-image.jpg';
import presentations from "./presentations.json";
import publications from "./publications.json";
import { FaPython, FaReact, FaLinkedin,FaGithub } from "react-icons/fa";
import { SiPytorch } from "react-icons/si";

const BACKEND_URL = "https://my-backend-592186673057.northamerica-northeast1.run.app/";

function App() {
  const [page, setPage] = useState("home");
  const buttons = ["Home", "Skills", "Experiences", "Publications", "Talks", "Certifications"];

  return (
    <div>
      {page === "home" && <Home buttons={buttons} setPage={setPage} />}
      {page === "experiences" && <Experience setPage={setPage} buttons={buttons} />}
      {page === "skills" && <Skills setPage={setPage} buttons={buttons} />}
      {page === "publications" && <Publication setPage={setPage} buttons={buttons} />}
      {page === "talks" && <Talks setPage={setPage} buttons={buttons} />}
      {page === "certifications" && <Certifications setPage={setPage} buttons={buttons} />}
    </div>
  );
}

export default App;

// ----------- Home -----------
function Home({ buttons, setPage }) {
  const [activeButton, setActiveButton] = useState(null);
  const [Message, setMessage] = useState("Loading...");
  const [about, setAbout] = useState("");

  const handleClick = (name) => {
    setActiveButton(name.toLowerCase());
    setPage(name.toLowerCase());
  };

  const buttonElements = buttons.map((name, index) => (
    <button
      key={index}
      onClick={() => handleClick(name)}
      className={`nav-button ${activeButton === name.toLowerCase() ? "active" : ""}`}
    >
      {name}
    </button>
  ));

  useEffect(() => {
    fetch(`${BACKEND_URL}/`)
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/about`)
      .then((res) => res.json())
      .then((data) => setAbout(data.about))
      .catch((err) => console.error("Error fetching about info:", err));
  }, []);

  return (
    <div>
      <div className="top-buttons">{buttonElements}</div>
      <div className="photo-container">
        <h2 className="welcome-text">Welcome to my website!</h2>
        <h1 className="name-text">I'm Iren Darijani</h1>
        <img src={myPhoto} alt="Iren" className="my-photo" />
        <h2>{Message}</h2>
      </div>
      <div className="about-container">
        <div className="about-text" dangerouslySetInnerHTML={{ __html: about }} />
      </div>
       <footer className="contact-footer">
  <h2 className="contact-title">Get in touch</h2>
  <p className="contact-text">
    I’m always open to discussing new opportunities or collaborations.  
    You can reach me directly at:
  </p>

  <div className="contact-links" style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "10px" }}>
    {/* Email */}
    <a href="mailto:iren.darijani2@gmail.com" className="contact-email" style={{ color: "inherit", textDecoration: "none", fontWeight: "bold" }}>
      iren.darijani2@gmail.com
    </a>

    {/* Social icons */}
    <div className="contact-icons" style={{ display: "flex", gap: "15px" }}>
      <a
        href="https://www.linkedin.com/in/iren-darijani-phd-5917276a/"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-linkedin"
        style={{ color: "#0A66C2" }} // LinkedIn blue
      >
        <FaLinkedin size={30} />
      </a>

      <a
        href="https://github.com/IrenDarijani"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-github"
        style={{ color: "#ffffff" }} // GitHub white
      >
        <FaGithub size={30} />
      </a>
    </div>
  </div>
</footer>

      
    </div>
  );
}

// ----------- Experience -----------
function Experience({ buttons, setPage }) {
  const [activeButton, setActiveButton] = useState(null);
  const [experiences, setExperiences] = useState([]);

  const handleClick = (name) => {
    setActiveButton(name.toLowerCase());
    setPage(name.toLowerCase());
  };

  const buttonElements = buttons.map((name, index) => (
    <button
      key={index}
      onClick={() => handleClick(name)}
      className={`nav-button1 ${activeButton === name.toLowerCase() ? "active" : ""}`}
    >
      {name}
    </button>
  ));

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/experience`)
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch((err) => console.error("Error fetching experience:", err));
  }, []);

  return (
    <div className="other-page">
      <div className="topImage-container">
        <img src={topImage} alt="Iren" className="top-image" />
        <div className="top-buttons1">{buttonElements}</div>
        <h1 className="top-text">Experiences</h1>
      </div>

      <div className="experience-container">
        {experiences.map((exp) => {
          if (exp.type === "html") {
            return (
              <div key={exp.id} className="experience-html" dangerouslySetInnerHTML={{ __html: exp.content }} />
            );
          }

          if (exp.type === "image") {
            // Use the image URL directly from backend
            return (
              <div key={exp.id} className="experience-image">
                <img src={exp.image} alt={`Experience ${exp.id}`} />
              </div>
            );
          }

          return (
            <div key={exp.id} className="experience-card">
              <h2>{exp.position}</h2>
              {exp.institution && <h3>{exp.institution}</h3>}
              {exp.period && <p>{exp.period}</p>}
              {exp.details?.length > 0 && (
                <ul>
                  {exp.details.map((detail, index) => (
                    <li key={index}>
                      {detail.label ? `${detail.label}: ` : ""}
                      {detail.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
// ----------- Skills -----------
function Skills({ buttons, setPage }) {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (name) => {
    setActiveButton(name.toLowerCase());
    setPage(name.toLowerCase());
  };

  const buttonElements = buttons.map((name, index) => (
    <button
      key={index}
      onClick={() => handleClick(name)}
      className={`nav-button1 ${activeButton === name.toLowerCase() ? "active" : ""}`}
    >
      {name}
    </button>
  ));

  return (
    <div className="other-page">
      <div className="topImage-container">
        <img src={topImage} alt="Iren" className="top-image" />
        <div className="top-buttons1">{buttonElements}</div>
        <h1 className="top-text">Skills and Tools</h1>
      </div>

      <div className="skills-container">
        <div className="skills-grid">
          <div className="skill-card">
            <h2 className="skill-heading">Mathematics</h2>
            <p>Statistics, Graph Theory, Probability, Linear Algebra, Calculus.</p>
          </div>
          <div className="skill-card">
            <h2 className="skill-heading">Geophysics</h2>
            <p>Subsurface resource exploration, Magnetic and Gravity inversion.</p>
          </div>
          <div className="skill-card">
            <h2 className="skill-heading">Machine Learning</h2>
            <p>Linear Regression, Polynomial Regression, Decision Tree, Random Forest, Logistic Regression, SVM, Classification, Clustering, Reinforcement Learning.</p>
          </div>
          <div className="skill-card">
            <h2 className="skill-heading">Deep Learning</h2>
            <p>Standard Neural Networks, CNNs, RNNs.</p>
          </div>
          <div className="skill-card">
            <h2 className="skill-heading"><FaPython className="icon" /> Programming</h2>
            <p>Python, R, SQL.</p>
          </div>
          <div className="skill-card">
            <h2 className="skill-heading"><SiPytorch className="icon" /> Python Libraries</h2>
            <p>NumPy, Pandas, Matplotlib, Scikit-learn, SciPy, PyTorch.</p>
          </div>
          <div className="skill-card">
            <h2 className="skill-heading"><FaReact className="icon" /> Frontend Development</h2>
            <p>React, HTML, JavaScript, CSS.</p>
          </div>
          <div className="skill-card">
            <h2 className="skill-heading"><FaReact className="icon" /> Backend Development</h2>
            <p>Node.js, Docker, Cloud.</p>
          </div>
          <div className="skill-card wide">
            <h2 className="skill-heading">Tools</h2>
            <p>MAGNUM (geophysical inversion), Orange (AI), Geosoft, Paraview, QGIS, LaTeX.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------- Publications -----------
function Publication({ buttons, setPage }) {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (name) => {
    setActiveButton(name.toLowerCase());
    setPage(name.toLowerCase());
  };

  const buttonElements = buttons.map((name, index) => (
    <button
      key={index}
      onClick={() => handleClick(name)}
      className={`nav-button1 ${activeButton === name.toLowerCase() ? "active" : ""}`}
    >
      {name}
    </button>
  ));

  return (
    <div className="other-page">
      <div className="topImage-container">
        <img src={topImage} alt="Iren" className="top-image" />
        <div className="top-buttons1">{buttonElements}</div>
        <h1 className="top-text">Publications</h1>
      </div>

      <ul className='publications'>
        {publications.map(pub => {
          const arxivLink = pub.arxiv ? `${pub.arxiv}` : null;
          return (
            <li key={pub.id}>
              <strong>{pub.title}</strong><br />
              <em>{pub.authors}</em><br />
              {pub.journal}
              {pub.volume ? `, Vol. ${pub.volume}` : ""}
              {pub.pages ? `, pp. ${pub.pages}` : ""}
              , {pub.year}
              {arxivLink && (
                <>
                  <br />
                  <a href={arxivLink} target="_blank" rel="noopener noreferrer">{arxivLink}</a>
                </>
              )}
              {pub.doi && (
                <>
                  <br />
                  <a href={pub.doi} target="_blank" rel="noopener noreferrer">{pub.doi}</a>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ----------- Talks -----------
function Talks({ buttons, setPage }) {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (name) => {
    setActiveButton(name.toLowerCase());
    setPage(name.toLowerCase());
  };

  const buttonElements = buttons.map((name, index) => (
    <button
      key={index}
      onClick={() => handleClick(name)}
      className={`nav-button1 ${activeButton === name.toLowerCase() ? "active" : ""}`}
    >
      {name}
    </button>
  ));

  return (
    <div className="other-page">
      <div className="topImage-container">
        <img src={topImage} alt="Iren" className="top-image" />
        <div className="top-buttons1">{buttonElements}</div>
        <h1 className="top-text">Talks</h1>
      </div>

      <ul className='talks'>
        {presentations.map(p => (
          <li key={p.id}>
            <strong>{p.title}</strong>, {p.event}
            {p.place ? `, ${p.place}` : ""}, {p.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ----------- Certifications -----------
function Certifications({ buttons, setPage }) {
  const [courses, setCourses] = useState([]);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Error fetching courses:", err));
  }, []);

  const handleClick = (name) => {
    setActiveButton(name.toLowerCase());
    setPage(name.toLowerCase());
  };

  const buttonElements = buttons.map((name, index) => (
    <button
      key={index}
      onClick={() => handleClick(name)}
      className={`nav-button1 ${activeButton === name.toLowerCase() ? "active" : ""}`}
    >
      {name}
    </button>
  ));

  return (
    <div className='other-page'>
      <div className="topImage-container">
        <img src={topImage} alt="Iren" className="top-image" />
        <div className="top-buttons1">{buttonElements}</div>
        <h1 className="top-text">Certifications</h1>
      </div>

      <ul className='certifications'>
        {courses.map((course, index) => {
          let display = "";

          if (course.status === "Certificate earned" && course.monthYear) {
            display = `Certificate earned on ${course.monthYear}`;
          } else if (course.status === "Audited" && course.year) {
            display = `Audited, ${course.year}`;
          }

          return (
            <li key={index} className="certific_list">
              <strong>{course.title}</strong>, {course.platform}
              {display ? `, ${display}` : ""}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
