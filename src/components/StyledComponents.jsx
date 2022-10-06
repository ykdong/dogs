import styled from 'styled-components';

const DisplayBox = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-content: center;
    border: 1px solid #D3D3D3;
    height: 500px;
    width: 80%;
    background-color: #ffb88c;
    box-shadow: 1px 8px 20px #3D3D3D;
    border-radius: 5px;
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const FormContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25rem;
  height: 150px;
  background-color: white;
  padding: 1rem;
  overflow: auto;
`;

const CloseButton = styled.span`
  float: right;
  font-size: 1.5em;
  color: grey;
  :hover {
    color: black;
    cursor: pointer;
  }
`;

const QueryContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  justify-content: flex-start;
`;

export { DisplayBox, Overlay,  FormContainer, CloseButton, QueryContainer };