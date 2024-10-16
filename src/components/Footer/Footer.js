import React from "react";
import "./Footer.css"; // Importando o arquivo CSS

const Footer = () => {
  return (
    <footer className="footer footer--active">
      <div className="footer__copyrights">
        &copy; {new Date().getFullYear()} José. Todos os direitos reservados.
      </div>
      <nav className="footer__navbar">
        <ul className="footer__links">
          <li>
            <a href="#about" className="footer__link">
              Sobre
            </a>
          </li>
          <li>
            <a href="#projects" className="footer__link">
              Projetos
            </a>
          </li>
          <li>
            <a href="#contact" className="footer__link">
              Contato
            </a>
          </li>
        </ul>
      </nav>
      <div className="footer__icons">
        <a
          href="https://github.com"
          className="footer__icon footer__icon--github"
          target="_blank"
          rel="noreferrer"
        ></a>
        <a
          href="https://linkedin.com"
          className="footer__icon footer__icon--linkedin"
          target="_blank"
          rel="noreferrer"
        ></a>
      </div>
    </footer>
  );
};

export default Footer;
