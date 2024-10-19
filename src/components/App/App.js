import { React, useState, useEffect } from "react";
import CurrentUserContext from "../../utils/CurrentUserContext";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import SavedNews from "../SavedNews/SavedNews";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import SigninPopup from "../SigninPopup/SigninPopup";
import SignupPopup from "../SignupPopup/SignupPopup";
import SuccessRegisterPopup from "../SuccessRegisterPopup/SuccessRegisterPopup";
import NewsApi from "../../utils/NewsApi";
import MainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { namesOfMonthes } from "../../utils/constants";
import ContentLoader from "../ContentLoader/ContentLoader";
import { Navigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [keywordsCollection, setKeywordsCollection] = useState([]);
  const [isDirectedToSavedNewsRoute, setisDirectedToSavedNewsRoute] =
    useState(false);
  const [isPopupSigninOpen, setIsPopupSigninOpen] = useState(false);
  const [isFooterDisplayed, setIsFooterDisplayed] = useState(false);

  async function handleNavigation(route) {
    await navigate(route);
    setIsFooterDisplayed(true);
  }

  useEffect(() => {
    setIsFooterDisplayed(false);
    navigate("/content-loader");
    const jwtToken = localStorage.getItem("jwt");
    setToken(jwtToken);
    if (jwtToken) {
      MainApi.getInitialAppInfo(jwtToken)
        .then((res) => {
          if (res) {
            const [userInfo, savedCardsData] = res;
            setCurrentUser(userInfo);
            setSavedCards(savedCardsData);
            setKeywordsCollection(savedCardsData.map((card) => card.keyword));
            setIsLoggedIn(true);
            handleNavigation(
              isDirectedToSavedNewsRoute ? "/saved-news" : "/main"
            );
          } else {
            localStorage.removeItem("jwt");
            setIsLoggedIn(false);
            setIsFooterDisplayed(true);
            navigate("/main");
            if (isDirectedToSavedNewsRoute) {
              setIsPopupSigninOpen(true);
            }
          }
        })
        .catch((err) => {
          setIsFooterDisplayed(true);
          navigate("/main");
        });
    } else {
      navigate("/main");
      setIsFooterDisplayed(true);
      setIsLoggedIn(false);
      if (isDirectedToSavedNewsRoute) {
        setIsPopupSigninOpen(true);
      }
    }
  }, [token, navigate, isDirectedToSavedNewsRoute]);

  const [currentUser, setCurrentUser] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [isShowMoreActive, setIsShowMoreActive] = useState(true);

  function toggleIsDirectedToSavedNews() {
    setisDirectedToSavedNewsRoute(!isDirectedToSavedNewsRoute);
  }

  const onRegister = (email, password, name) => {
    MainApi.register(email, password, name)
      .then((res) => {
        if (res._id) {
          closeAllPopups();
          toggleSuccessRegisterPopupState();
        }
      })
      .catch((err) => {
        if (err === "Error: 409") {
          setSubmitError("A user with that Email already exists.");
        }
      });
  };

  const onLogin = (email, password) => {
    setSubmitError("");
    MainApi.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          setIsLoggedIn(true);
          closeAllPopups();
        }
      })
      .catch((err) => {
        if (err === "Error: 401" || err === "Error: 400") {
          setSubmitError("Email or password is incorrect. Please try again.");
        }
      });
  };

  const [newsApiReceivedCards, setNewsApiReceivedCards] = useState([]);
  const [renderedCards, setRenderedCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  function toggleSigninPopupState() {
    setSubmitError("");
    setIsPopupSigninOpen(!isPopupSigninOpen);
  }

  const [isPopupSignupOpen, setIsPopupSignupOpen] = useState(false);
  function toggleSignupPopupState() {
    setSubmitError("");
    setIsPopupSignupOpen(!isPopupSignupOpen);
  }

  const [isPopupSuccessRegisterOpen, setIsPopupSuccessRegisterOpen] =
    useState(false);
  function toggleSuccessRegisterPopupState() {
    setIsPopupSuccessRegisterOpen(!isPopupSuccessRegisterOpen);
  }

  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  function toggleMobileNavigationState() {
    setIsMobileNavigationOpen(!isMobileNavigationOpen);
  }

  const handleEscPress = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };

  function closeAllPopups() {
    setIsPopupSigninOpen(false);
    setIsPopupSignupOpen(false);
    setIsPopupSuccessRegisterOpen(false);
    setIsMobileNavigationOpen(false);
  }

  function onRelativeSignupClick() {
    closeAllPopups();
    toggleSignupPopupState();
  }

  function onRelativeSigninClick() {
    closeAllPopups();
    toggleSigninPopupState();
  }

  function onArticleSearch(question) {
    setIsFound(true);
    setRenderedCards([]);
    setIsSearching(true);
    setIsLoading(true);
    setIsShowMoreActive(true);
    NewsApi.getArticles(question)
      .then((res) => {
        if (res.articles.length !== 0) {
          const editedArticles = res.articles.map((article) => {
            const {
              description: text,
              publishedAt: date,
              source,
              title,
              url: link,
              urlToImage: image,
            } = article;
            const editedSource = source.name;
            const editedDate = convertDataToDate(date);
            const editedArticle = {
              isSaved: false,
              keyword: question,
              text,
              date: editedDate,
              source: editedSource,
              title,
              link,
              image,
            };
            savedCards.forEach((card) => {
              if (card.link === editedArticle.link) {
                editedArticle.isSaved = true;
              }
            });
            return editedArticle;
          });
          setIsLoading(false);
          setRenderedCards(editedArticles.splice(0, 3));
          setNewsApiReceivedCards(editedArticles);
        } else {
          setIsLoading(false);
          setIsFound(false);
        }
      })
      .catch(() => {});
  }

  function convertDataToDate(date) {
    const year = date.substr(0, 4);
    const month = date.substr(5, 2);
    let day = date.substr(8, 2);
    let monthName = "";
    Object.values(namesOfMonthes).forEach((monthNumber, i) => {
      if (month === monthNumber) {
        monthName = Object.keys(namesOfMonthes)[i];
      }
    });
    if (day.charAt(0) === "0") {
      day = day.substr(1, 1);
    }
    return `${monthName} ${day}, ${year}`;
  }

  function showMoreCards() {
    setRenderedCards([...renderedCards, ...newsApiReceivedCards.splice(0, 3)]);
    if (newsApiReceivedCards.length === 0) {
      setIsShowMoreActive(false);
    }
  }

  function onSaveCard(card) {
    const savedCard = { ...card, isSaved: true };
    return MainApi.saveCard(card, token)
      .then((res) => {
        setSavedCards([...savedCards, res]);
        setRenderedCards((state) =>
          state.map((currentCard) =>
            currentCard.link === savedCard.link ? savedCard : currentCard
          )
        );
        const keywords = [...keywordsCollection, res.keyword];
        setKeywordsCollection(keywords);
        sortKeywordsByFrequency();
      })
      .catch(() => {});
  }

  function sortKeywordsByFrequency() {
    const frequency = keywordsCollection.reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {});
    const sortedKeywords = Object.keys(frequency).sort(
      (a, b) => frequency[b] - frequency[a]
    );
    return sortedKeywords;
  }

  function onDeleteCard(card) {
    const toDeleteCard = savedCards.find(
      (currentCard) => card.link === currentCard.link
    );
    return MainApi.deleteCard(toDeleteCard._id, token)
      .then(() => {
        setSavedCards((prevState) =>
          prevState.filter(
            (currentCard) => toDeleteCard._id !== currentCard._id
          )
        );
      })
      .catch(() => {});
  }

  function onCardClick(card) {
    window.open(card.link, "_blank");
  }

  const cardFunctions = {
    dateConvert: convertDataToDate,
    showMoreCards,
    isShowMoreActive,
    onSaveClick: onSaveCard,
    onDeleteClick: onDeleteCard,
    onCardClick,
  };

  function onSigninClick() {
    closeAllPopups();
    toggleSigninPopupState();
  }

  function onLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/main");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app" tabIndex={0} onKeyDown={handleEscPress}>
        <Routes>
          <Route
            path="/main"
            element={
              <>
                <Header
                  isLoggedIn={isLoggedIn}
                  isMobileNavigationActive={isMobileNavigationOpen}
                  onMobileNavigationButtonClick={toggleMobileNavigationState}
                  onSigninClick={onSigninClick}
                  insideSavedArticles={false}
                  onLogout={onLogout}
                />
                <Main
                  isLoggedIn={isLoggedIn}
                  isInsideMain
                  isInsideSavedArticles={false}
                  onArticleSearch={onArticleSearch}
                  cards={renderedCards}
                  cardFunctions={cardFunctions}
                  isSearching={isSearching}
                  isLoading={isLoading}
                  isFound={isFound}
                />
              </>
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                changeDirectionState={toggleIsDirectedToSavedNews}
                redirectedPath="/main"
              >
                <>
                  <SavedNewsHeader
                    isMobileNavigationActive={isMobileNavigationOpen}
                    onMobileNavigationButtonClick={toggleMobileNavigationState}
                    onSigninClick={onSigninClick}
                    isInsideSavedArticles={true}
                    onLogout={onLogout}
                  />
                  <SavedNews
                    isLoggedIn
                    isInsideMain={false}
                    isInsideSavedArticles={true}
                    savedCards={savedCards}
                    cardFunctions={cardFunctions}
                    keywords={sortKeywordsByFrequency()}
                  />
                </>
              </ProtectedRoute>
            }
          />
          <Route path="/content-loader" element={<ContentLoader />} />
          <Route path="*" element={<Navigate to="/main" />} />
        </Routes>
        <Footer isFooterDisplayed={isFooterDisplayed} />
        <SigninPopup
          isPopupOpen={isPopupSigninOpen}
          onSubmit={onLogin}
          onRelativePathClick={onRelativeSignupClick}
          submitError={submitError}
          onClose={closeAllPopups}
        />
        <SignupPopup
          isPopupOpen={isPopupSignupOpen}
          onSubmit={onRegister}
          submitError={submitError}
          onRelativePathClick={onRelativeSigninClick}
          onClose={closeAllPopups}
        />
        <SuccessRegisterPopup
          isPopupOpen={isPopupSuccessRegisterOpen}
          onRelativePathClick={onRelativeSigninClick}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
