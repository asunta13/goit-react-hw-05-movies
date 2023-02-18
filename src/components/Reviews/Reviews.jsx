import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getMovieReviews } from '../../api';
import { Loader } from 'components/Loader';
import { ReviewsBox, ReviewAuthor } from './Reviews.styled';

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getActors() {
      try {
        setIsLoading(true);
        const result = await getMovieReviews(id);
        setReviews(result);
        setIsLoading(false);
      } catch (error) {
        toast.error('Something went wrong! Please try again.');
      }
    }
    getActors();
  }, [id]);
  const { results } = reviews;
  return (
    <section>
      {results && results.length > 0 ? (
        <ReviewsBox>
          {results.map(({ author, id, content }) => {
            return (
              <li key={id}>
                <ReviewAuthor>Author: {author}</ReviewAuthor>
                <p>{content}</p>
              </li>
            );
          })}
        </ReviewsBox>
      ) : (
        <div>We don't have any reviews for this movie.</div>
      )}
      {isLoading && <Loader />}
    </section>
  );
};

export default Reviews;
