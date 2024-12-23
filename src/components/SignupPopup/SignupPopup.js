import React, { useState } from "react";
import PopupFormInput from "../PopupFormInput/PopupFormInput";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import "./SignupPopup.css";

function SignupPopup({
  isPopupOpen,
  onSubmit,
  onRelativePathClick,
  submitError,
  onClose,
}) {
  const [inputsErrors, setInputsErrors] = useState([]);

  const editInputsErrors = (isError, inputName) => {
    let tempErrorsArray = inputsErrors;
    tempErrorsArray = tempErrorsArray.filter((name) => name !== inputName);
    if (isError) {
      tempErrorsArray.push(inputName);
    }
    setInputsErrors(tempErrorsArray);
  };

  const [isSubmitButtonClicked, setisSubmitButtonClicked] = useState(false);

  function toggleSubmitButtonClickedState(isClicked) {
    setisSubmitButtonClicked(isClicked);
  }

  const [email, setEmail] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
    toggleSubmitButtonClickedState(false);
  }

  const [password, setPassword] = useState("");

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    toggleSubmitButtonClickedState(false);
  }

  const [username, setUsername] = useState("");

  function handleUsernameChange(e) {
    setUsername(e.target.value);
    toggleSubmitButtonClickedState(false);
  }

  function onSubmitPopup() {
    toggleSubmitButtonClickedState(true);
    onSubmit(email, password, username);
  }
  return (
    <PopupWithForm
      isPopupOpen={isPopupOpen}
      popupTitle="Sign up"
      submitButtonText="Sign up"
      relativePath="Sign in"
      onSubmit={onSubmitPopup}
      isSubmitButtonClicked={isSubmitButtonClicked}
      inputsErrors={inputsErrors}
      submitError={submitError}
      onClose={onClose}
      onRelativePathClick={onRelativePathClick}
    >
      <PopupFormInput
        label="Email"
        type="email"
        name="email"
        id="signUpEmail"
        inputValue={email}
        handleInputChange={handleEmailChange}
        inputPlaceholder="Enter email"
        minLength={2}
        maxLength={30}
        isRequired={true}
        editInputsErrors={editInputsErrors}
        isPopupOpen={isPopupOpen}
      />
      <PopupFormInput
        label="Password"
        type="text"
        name="password"
        id="password"
        inputValue={password}
        handleInputChange={handlePasswordChange}
        inputPlaceholder="Enter password"
        minLength={2}
        maxLength={30}
        isRequired={true}
        editInputsErrors={editInputsErrors}
        isPopupOpen={isPopupOpen}
      />
      <PopupFormInput
        label="Username"
        type="text"
        name="username"
        id="username"
        inputValue={username}
        handleInputChange={handleUsernameChange}
        inputPlaceholder="Enter your username"
        minLength={2}
        maxLength={30}
        editInputsErrors={editInputsErrors}
        isRequired={true}
        isPopupOpen={isPopupOpen}
      />
    </PopupWithForm>
  );
}

export default SignupPopup;
