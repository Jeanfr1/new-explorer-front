import React, { useState } from "react";
import "./Navigation.css"; // Importando o arquivo CSS

const Navigation = ({ isSavedNewsPage }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  // Função para alternar o menu de navegação em telas pequenas
  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <nav
      className={`navigation ${
        isSavedNewsPage ? "navigation--in-saved-news" : ""
      } ${isMenuActive ? "navigation--active" : ""}`}
    >
      <a
        href="/"
        className={`navigation__path navigation__path--home ${
          !isSavedNewsPage ? "navigation__path--decorated-main" : ""
        }`}
      >
        Início
      </a>
      <a
        href="/saved-news"
        className={`navigation__path navigation__path--saved-articles ${
          isSavedNewsPage ? "navigation__path--decorated-saved-news" : ""
        }`}
      >
        Artigos Salvos
      </a>
      <button
        className={`navigation__button ${
          isSavedNewsPage ? "navigation__button--in-saved-news" : ""
        }`}
      >
        José
        <span
          className={`navigation__exit-icon ${
            isSavedNewsPage ? "navigation__exit-icon--in-saved-news" : ""
          }`}
        ></span>
      </button>
      <button className="navigation__nav-button" onClick={toggleMenu}></button>
    </nav>
  );
};

export default Navigation;
