import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer({ isFooterDisplayed }) {
  return (
    <footer className={`footer ${isFooterDisplayed ? "footer--active" : ""}`}>
      <p className="footer__copyrights">
        &copy; 2024, Powered by Josean Araujo
      </p>
      <nav className="footer__navbar">
        <div className="footer__links">
          <Link to="/main" className="footer__link">
            Home
          </Link>
          <a
            href="https://tripleten.com.br/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Practicum
          </a>
        </div>
        <div className="footer__icons">
          <a
            href="https://github.com/Jeanfr1"
            className="footer__icon footer__icon--github"
            target="_blank"
            rel="noopener noreferrer"
          />
          <a
            href="https://www.linkedin.com/in/josean-araujo-3ba63b17b/"
            className="footer__icon footer__icon--linkedin"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
