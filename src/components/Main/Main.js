import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";

function Main({ onSearch }) {
  return (
    <main className="main">
      <h1>Bem-vindo ao News Explorer</h1>
      <p>Pesquise as últimas notícias!</p>
      <SearchForm onSearch={onSearch} />
    </main>
  );
}

export default Main;
