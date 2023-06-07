import React, { useState } from "react";
import './LoginForm.css';

const LogInForm = ({ navigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [shakeEffect, setShakeEffect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    if (response.status !== 201) {
      setLoginError(true);
      setShakeEffect(true);
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setShakeEffect(false);
      }, 500);
      return;
    }

    console.log("Login successful!");

    let data = await response.json();
    window.localStorage.setItem("token", data.token);
    window.localStorage.setItem("username", username);

    let avatarResponse = await fetch(`/users/${username}/avatars`);
    let avatarData = await avatarResponse.json();
    window.localStorage.setItem("avatar", avatarData.avatar);

    const expirationDate = new Date();
    expirationDate.setDate(
      expirationDate.getDate() + 1 * 24 * 60 * 60 * 1000
    );

    let cookieValue =
      encodeURIComponent("token") + "=" + encodeURIComponent(data.token);
    cookieValue += "; expires=" + expirationDate.toUTCString();
    cookieValue += "; path=/"; // Optional: set the cookie path

    document.cookie = cookieValue;

    navigate("/posts");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUpClick = (event) => {
    window.location.href = "http://localhost:3000/signup";
  };

  return (
    <>
      <div className="study-buddy-heading">
        <h1>Study Buddy</h1>
      </div>
      <div className="additional-text">
        <p>
          In a world where knowledge knows no boundaries, where learning is an eternal quest, a group of exceptional minds has come together to form the ultimate study group. But this is no ordinary group. Their secret weapon is a brilliant, eccentric AI helper that rivals even the legendary Sheldon Cooper.
        </p>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <div className={`input-group ${shakeEffect ? "shake" : ""}`}>
            <input
              placeholder={loginError ? "Clearly you're wrong" : "Username"}
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className={loginError ? "error" : ""}
            />
          </div>
          <div className={`input-group ${shakeEffect ? "shake" : ""}`}>
            <input
              placeholder={loginError ? "Clearly you're wrong" : "Password"}
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={loginError ? "error" : ""}
            />
          </div>
          {loginError && (
            <div className="error-message" loginError={loginError}>
              Clearly you're wrong
            </div>
          )}
          <div className="button-group">
            <input
              className="login-button"
              role="submit-button"
              id="submit"
              type="submit"
              value="Log in"
            />
            <div className="button-spacing"></div>
            <button
              className="create-account-button"
              onClick={handleSignUpClick}
            >
              Create new account
            </button>
          </div>
        </form>
      </div>
    </>
  );
};


export default LogInForm;
