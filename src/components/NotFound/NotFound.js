import React from "react";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__image" />
      <h2 className="not-found__title">Nothing found</h2>
      <p className="not-found__paragraph">
        Sorry, but nothing matched <br />
        your search terms.
      </p>
    </div>
  );
}

export default NotFound;
