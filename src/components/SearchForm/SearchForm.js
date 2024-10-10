import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) {
      setError("Por favor, insira uma palavra-chave");
      return;
    }
    setError("");
    onSearch(inputValue);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Pesquise por notícias"
      />
      <button type="submit">Buscar</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default SearchForm;
