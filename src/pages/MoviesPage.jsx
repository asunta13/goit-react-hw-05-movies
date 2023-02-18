import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getMoviesByKeyword } from '../api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { Loader } from 'components/Loader';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchMovies, setSearchMovies] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) {
      return;
    }
    async function getMovie() {
      try {
        setIsLoading(true);
        const { results } = await getMoviesByKeyword(query);
        if (results.length === 0) {
          toast.error('No movies found :( Please try a new search');
          setIsLoading(false);
          return;
        }
        setSearchMovies(results);
        setIsLoading(false);
      } catch (error) {
        toast.error('Something went wrong! Please try again.');
      }
    }
    getMovie();
  }, [query]);

  const handleSumbit = query => {
    setSearchParams({ query: query });
  };
  return (
    <main>
      <Searchbar onSubmit={handleSumbit} />
      {searchMovies && <MoviesList movies={searchMovies} />}
      {isLoading && <Loader />}
      <Toaster />
    </main>
  );
};

export default MoviesPage;
