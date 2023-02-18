import styled from 'styled-components';

export const Searchform = styled.form`
  display: flex;
  align-items: baseline;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 16px;
  border: 1px solid grey;
`;

export const Input = styled.input`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  ::placeholder {
    font: inherit;
    font-size: 18px;
  }
`;

export const SearchButton = styled.button`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  background-color: transparent;
  :hover {
    opacity: 1;
  }
`;
