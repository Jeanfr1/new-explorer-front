import React, { useContext } from "react";
import "./About.css";
import CurrentUserContext from "../../utils/CurrentUserContext";

function About() {
  const currentUserValue = useContext(CurrentUserContext);
  return (
    <section className="about">
      <div className="about__image" />
      <div className="about__content">
        <h2 className="about__title">About me</h2>
        <p className="about__description">
          Josean Araujo is a Software Engineer currently living in Paris,
          France. After previously working as a sales and training specialist,
          He is now seeking opportunities to apply his development skills in a
          professional setting. Fluent in English, French, and Portuguese, he
          will bring a global perspective and excellent communication skills to
          every project, helping bridge gaps between technical and non-technical
          teams.
        </p>
        <p>
          Now making another pivot back to the world of technology, Josean is
          about to complete the Software Engineering course at TripleTen to
          brush up his skills, learn new technologies, and gain the confidence
          to pursue his passion for working in the technology space.
        </p>
      </div>
    </section>
  );
}

export default About;
