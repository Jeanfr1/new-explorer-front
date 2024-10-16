import React from "react";
import "./About.css"; // Importando o arquivo CSS

const About = () => {
  return (
    <section className="about">
      <div className="about__image"></div>
      <div className="about__content">
        <h2 className="about__title">Sobre José</h2>
        <p className="about__description">
          José é um desenvolvedor full-stack apaixonado por tecnologia e
          inovação. Com vários anos de experiência no setor, ele contribuiu para
          diversos projetos voltados para a criação de soluções web escaláveis e
          de alta performance.
        </p>
      </div>
    </section>
  );
};

export default About;
