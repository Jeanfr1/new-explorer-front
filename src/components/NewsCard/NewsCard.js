import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Importar useLocation
import "./NewsCard.css";

function NewsCard({ cardFunctions, isLoggedIn, card }) {
  const [isArticleSaved, setIsArticleSaved] = useState(card.isSaved);
  const location = useLocation(); // Hook para verificar a rota atual

  function toggleArticleSavedState() {
    setIsArticleSaved(!isArticleSaved);
  }

  function onSaveArticleClick(evt) {
    evt.stopPropagation();
    if (isLoggedIn) {
      return cardFunctions.onSaveClick(card).then(() => {
        toggleArticleSavedState();
      });
    }
  }

  function onDeleteArticleClick(evt) {
    evt.stopPropagation();
    return cardFunctions.onDeleteClick(card).then(() => {
      toggleArticleSavedState();
    });
  }

  // Verificar a rota atual para condicionalmente renderizar o conteúdo
  const isMainPage = location.pathname === "/main";
  const isSavedNewsPage = location.pathname === "/saved-news";

  return (
    <div className="news-card" onClick={() => cardFunctions.onCardClick(card)}>
      {isMainPage && (
        <div
          className="news-card__image news-card__image_type_main"
          style={{ backgroundImage: `url(${card.image})` }}
        >
          <button
            className={`news-card__button ${
              !isLoggedIn ? "news-card__button_not-logged-in" : ""
            }`}
            onClick={isArticleSaved ? onDeleteArticleClick : onSaveArticleClick}
          >
            <div
              className={`news-card__save-icon ${
                isArticleSaved ? "news-card__save-icon_active" : ""
              }`}
            />
          </button>
          <span className="news-card__popup-text news-card__popup-text_type_main">
            Sign in to save articles
          </span>
        </div>
      )}

      {isSavedNewsPage && (
        <div
          className="news-card__image news-card__image_type_saved-news"
          style={{ backgroundImage: `url(${card.image})` }}
        >
          <button
            className="news-card__button news-card__button_type_saved-news"
            onClick={onDeleteArticleClick}
          >
            <div className="news-card__garbage-icon" />
          </button>
          <span className="news-card__popup-text news-card__popup-text_type_saved-news">
            Remove from saved
          </span>
          <p className="news-card__keyword">{card.keyword}</p>
        </div>
      )}

      <div className="news-card__description">
        <span className="news-card__date">{card.date}</span>
        <h3 className="news-card__title">{card.title}</h3>
        <p className="news-card__text">{card.text}</p>
        <span className="news-card__source">{card.source}</span>
      </div>
    </div>
  );
}

export default NewsCard;
