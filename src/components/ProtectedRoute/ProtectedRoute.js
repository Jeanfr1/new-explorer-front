import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  loggedIn,
  redirectedPath,
  changeDirectionState,
}) {
  const [isRouteLoading, setIsRouteLoading] = useState(true);

  useEffect(() => {
    changeDirectionState();
    if (loggedIn !== undefined) {
      setIsRouteLoading(false);
    }
  }, [changeDirectionState, loggedIn]);

  if (isRouteLoading) {
    return <p>Loading...</p>;
  }

  return loggedIn ? children : <Navigate to={redirectedPath} />;
}

export default ProtectedRoute;
