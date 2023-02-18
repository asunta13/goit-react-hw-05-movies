import PropTypes from 'prop-types';
import { useState } from 'react';
import { Searchform, Input, SearchButton } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => setQuery(event.target.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();
    if (!query) {
      return toast.error('Please enter the movie query!');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <Searchform onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <BsSearch />
        </SearchButton>

        <Input
          value={query}
          onChange={handleChange}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
      </Searchform>
      <Toaster />
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
