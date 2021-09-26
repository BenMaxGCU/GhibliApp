import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './Card.css';

const url = `https://ghibliapi.herokuapp.com/films`;

function Card() { 
  const { data, error } = useFetch(url);

  return !data ? (
      <div>

      </div>
  )
  : error ? 
  (
    <div>
      <h1>Oops! An error occured.</h1>
    </div>
  )
  : (
    <div className='cards'>
      {data.map((film) => (
        <div className='card' key={film.id}>
          <Link to={`/details/${film.title}/${film.release_date}`}>
            <div className="title-bg">
                <h1>{film.title}</h1>
                <h1>{film.original_title}</h1>
            </div>
            <p>Director: {film.director}</p>
            <p>Initial Release: {film.release_date}</p>
            <p>Description:</p>
            <p>{film.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Card;
