import { Link } from "react-router-dom";
import "./Header.css";
import { React, useContext } from "react";
import CurrentUserContext from "../../utils/CurrentUserContext";
import Navigation from "../Navigation/Navigation";

export default function Header({
  isLoggedIn,
  isMobileNavigationActive,
  onMobileNavigationButtonClick,
  onSavedArticlesClick,
  insideSavedArticles,
  onSigninClick,
  onLogout,
}) {
  const currentUserValue = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div
        className={`header__background ${
          isMobileNavigationActive ? "header__background_active" : ""
        }`}
      >
        <Link to="/main" className="header__logo">
          NewsExplorer
        </Link>
        <Navigation
          isLoggedIn={isLoggedIn}
          isActive={isMobileNavigationActive}
          onSavedArticlesClick={onSavedArticlesClick}
          insideMain
          insideSavedArticles={insideSavedArticles}
          onSigninClick={onSigninClick}
          onLogout={onLogout}
        />
        <button
          onClick={onMobileNavigationButtonClick}
          className={`header__nav-button ${
            isMobileNavigationActive ? "header__nav-button_type_esc-mode" : ""
          }`}
        />
      </div>
    </header>
  );
}
