import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { getTrendingMovies } from 'api';
import { Loader } from 'components/Loader';
import { MoviesList } from 'components/MoviesList/MoviesList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        const { results } = await getTrendingMovies();
        setMovies(results);
        setIsLoading(false);
      } catch (error) {
        toast.error('Something went wrong! Please try again');
      }
    }
    getMovies();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      <MoviesList movies={movies} />
      {isLoading && <Loader />}
      <Toaster />
    </main>
  );
};

export default HomePage;
