import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getMovieCredits } from '../../api';
import { Loader } from 'components/Loader';
import { Image, Thumb, CastSection } from './Cast.styled';
import poster from 'images/file_not_found.jpg';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

const Cast = () => {
  const { id } = useParams();
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getActors() {
      try {
        setIsLoading(true);
        const result = await getMovieCredits(id);
        setActors(result);
        setIsLoading(false);
      } catch (error) {
        toast.error('Something went wrong! Please try again.');
      }
    }
    getActors();
  }, [id]);
  const { cast } = actors;
  return (
    <CastSection>
      {cast && cast.length > 0 ? (
        <ul>
          {cast.map(({ id, profile_path, name, character }) => {
            return (
              <li key={id}>
                <Thumb>
                  <Image
                    src={
                      profile_path ? `${BASE_IMG_URL}${profile_path}` : poster
                    }
                    alt="Actor"
                  />
                </Thumb>
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>We don't have information about cast for this movies.</div>
      )}
      {isLoading && <Loader />}
    </CastSection>
  );
};

export default Cast;
