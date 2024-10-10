import React from "react";
import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader-container">
      <div className="preloader-spinner">
        <div className="preloader-circle"></div>
        <div className="preloader-circle"></div>
      </div>
      <p className="preloader-text">Carregando...</p>
    </div>
  );
}

export default Preloader;
