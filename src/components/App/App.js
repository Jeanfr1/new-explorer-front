import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { fetchNews } from "../../utils/NewsApi";
import Preloader from "../Preloader/Preloader";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const handleSearch = async (searchQuery) => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedArticles = await fetchNews(searchQuery);
      setArticles(fetchedArticles);
    } catch (error) {
      setError("Desculpe, algo deu errado durante a solicitação.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <Main onSearch={handleSearch} />
      {isLoading && <Preloader />}
      {error && <p className="error">{error}</p>}
      {articles.length > 0 && (
        <section className="results">
          {articles.slice(0, 3).map((article, index) => (
            <div key={index} className="news-card">
              <img src={article.urlToImage} alt={article.title} />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
          ))}
          {articles.length > 3 && <button>Mostrar mais</button>}
        </section>
      )}
      <Footer />
    </div>
  );
}

export default App;
