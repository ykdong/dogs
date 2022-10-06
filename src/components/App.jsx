import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ErrorMessage, ImageContainer, BreedsList } from './FunctionalComponents.jsx';
import { QueryContainer } from './StyledComponents.jsx';

const URL = 'http://localhost:3011';

const App = () => {
  const [userBreed, setUserBreed] = useState('');
  const [image, setImage] = useState('');
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  const [list, setList] = useState('');

  useEffect(() => {
    axios
      .get(`${URL}/list`)
      .then(response => setList(response.data.message));
  }, []);

  const handleUserInput = (e) => {
    setUserBreed(e.target.value);
  };

  const handleUserRequest = (e) =>{
    e.preventDefault();
    if (userBreed) {
      axios
      .get(`${URL}/${userBreed}`)
      .then(response => {console.log(response.data.message), setImage(response.data.message)})
    } else {
      setShowError(true);
      setMessage("Oops, we can not show images with nothing")
    }
  };

  const CloseErrorMessage = () => {
    setShowError(false);
  };

  return (
    <>
      <h1>Lots of dogs! 🐕</h1>
      <p>See photos of your favorite dogs</p>
      <form>
        <QueryContainer>
          <input 
            type="text" 
            name="breed" 
            placeholder="Enter a dog breed" 
            onChange={handleUserInput}  
            data-testid="inputBox"
          />
          <BreedsList 
            breeds={list} 
            handleUserInput={handleUserInput} 
            data-testid="list" 
          />
        </QueryContainer>
        <button 
          onClick={handleUserRequest} 
          type="submit"
          data-testid="fetch"
        >Fetch</button>
      </form>
      {image ? <ImageContainer image={image} breed={userBreed} /> : null }
      {showError ? <ErrorMessage ErrorMessage={message} CloseErrorMessage={CloseErrorMessage} /> : null}
    </>
  )
};

export default App;