import React, {useState, useEffect} from 'react';


const UserForm = () =>{
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const handleSubmit = (e) =>{
    e.preventDefault();

  }

  const submitForm = () =>{
    const data = {
      userEmail: userEmail,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName
    }
    console.log(data);
  }


}