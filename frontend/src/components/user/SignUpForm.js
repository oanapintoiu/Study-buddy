import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    if (avatar) {
      formData.append('avatar', avatar);
    }
    fetch('/users', {
      method: 'post',
      body: formData
    })
      .then(response => {
        if (response.status === 201) {
          navigate('/login');
        } else {
          navigate('/signup');
        }
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  return (
    <div>
      <div className="study-buddy-heading">
        <h1>Study Buddy</h1>
      </div>
      <div className="additional-text">
        <p>
          Complete the form below to join our community of eccentric neuron navigators!
        </p>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              placeholder="Email"
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="input-group">
            <input
              placeholder="Username"
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="input-group">
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>
          <div className="submit-button">
            <input id="submit" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
  }  

export default SignUpForm;
