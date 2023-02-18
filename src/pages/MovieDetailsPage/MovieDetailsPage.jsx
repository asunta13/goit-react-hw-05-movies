import { useEffect, useState, useCallback, Suspense } from 'react';
import {
  Outlet,
  useParams,
  useNavigate,
  Link,
  useLocation,
} from 'react-router-dom';
import { getMovieById } from '../../api';
import toast, { Toaster } from 'react-hot-toast';
import { BsArrowLeftShort } from 'react-icons/bs';
import { Loader } from 'components/Loader';
import {
  Button,
  MovieCard,
  Image,
  Title,
  Info,
  AddInfo,
} from './MovieDetailsPage.styled';
import poster from 'images/file_not_found.jpg';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        const result = await getMovieById(id);
        setMovie(result);
        setIsLoading(false);
      } catch (error) {
        toast.error('Something went wrong! Please try again');
      }
    }
    getMovie();
  }, [id]);
  const { title, poster_path, release_date, vote_average, genres, overview } =
    movie;
  const totalVoteAverage = 10;
  const percent = (vote_average * 100) / totalVoteAverage;
  const formateDate = dateString => {
    const parsedDate = Date.parse(dateString);
    return new Date(parsedDate).getFullYear();
  };
  const goBack = useCallback(() => navigate(from), [navigate, from]);
  return (
    <>
      <Button onClick={goBack}>
        <BsArrowLeftShort />
        Go back
      </Button>
      <MovieCard>
        <Image
          src={poster_path ? `${BASE_IMG_URL}${poster_path}` : poster}
          alt="Movie poster"
        />
        <div>
          <Title>
            {title} ({formateDate(release_date)})
          </Title>
          <p>
            User Score: <Info>{percent.toFixed()}%</Info>
          </p>
          <h2>Overview</h2>
          <p> {overview}</p>
          <h3>Genres </h3>
          <p>{genres && genres.map(genre => genre.name).join(' ')}</p>
        </div>
      </MovieCard>
      <AddInfo>
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link to="cast" state={{ from }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from }}>
              Reviews
            </Link>
          </li>
        </ul>
      </AddInfo>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>

      {isLoading && <Loader />}
      <Toaster />
    </>
  );
};

export default MovieDetailsPage;
