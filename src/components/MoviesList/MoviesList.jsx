import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

export const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <>
      <ul>
        {movies.map(({ id, title, name }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                {title || name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};
