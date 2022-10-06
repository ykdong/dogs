import React from 'react';
import { DisplayBox, Overlay,  FormContainer, CloseButton } from './StyledComponents.jsx';

const ErrorMessage = ({ ErrorMessage, CloseErrorMessage }) => {
  return (
      <Overlay>
          <FormContainer style={{height: "70px"}}>
              <CloseButton onClick={CloseErrorMessage}>&times;</CloseButton>
              <h4 data-testid="errorMessage">{ErrorMessage} &#128512; </h4>
          </FormContainer>
      </Overlay>
  );
};

const ImageContainer = ({ image, breed }) => (
  <DisplayBox>
    <img src={image} alt={`Image of ${breed}`} key={image} />
  </DisplayBox>
);

const BreedsList = ({ breeds, handleUserInput }) => (
  <select id='breedList' onChange={e => handleUserInput(e)}>
    <option value="">select a dog breed</option>
    {breeds && breeds.map(breed =>(
      <option value={breed} key={breed}>{breed}</option>
    ))}
  </select>
)

export { ErrorMessage, ImageContainer, BreedsList };