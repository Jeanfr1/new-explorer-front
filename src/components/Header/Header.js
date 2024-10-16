import React, { useState } from "react";
import "./Header.css"; // Importando o arquivo CSS

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  // Função para alternar o fundo do header ao rolar a página
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  // Adicionando listener de rolagem
  window.addEventListener("scroll", handleScroll);

  return (
    <header className="header">
      <div
        className={`header__background ${
          isActive ? "header__background_active" : ""
        }`}
      >
        <a href="/" className="header__logo">
          José
        </a>
        <button className="header__nav-button"></button>
      </div>
    </header>
  );
};

export default Header;
