import { Suspense, useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import './Movie.css';

const movieUrl = (formattedTitle, filmYear) => `https://api.themoviedb.org/3/search/movie?query=${formattedTitle}&api_key=${process.env.REACT_APP_MOVIE_API_KEY}&year=${filmYear}&include_adult=false`;

function Movie({ match }) {
  let formattedTitle = match.params.filmTitle.replace(/\s/g, '+');
  let filmYear = match.params.filmYear;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(movieUrl(formattedTitle, filmYear))
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result['results']);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedTitle, filmYear]);

  return error ? (<></>) 
  : !isLoaded ? (<div className='loaderContainer'><CircleLoader /></div>) : 
  (
    <div className='container'>
    <Suspense fallback={<CircleLoader />}>
      {data.map((film) => (
        <Link to={{ pathname: `https://www.themoviedb.org/movie/${film.id}` }} target="_blank">
        <div className='film' key={film.id}>
            <div className='imageContainer'>
                <img className='filmCover' src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt='' />
            </div>
            <div className='filmInfo'>
                <h1>{film.title}</h1>
                <div className='ratingContainer'>
                  <PieChart 
                    data={[{ value: film.vote_average, color: '#fad2e1'}]}
                    label={({ dataEntry }) => dataEntry.value + '/10'}
                    totalValue={10}
                    lineWidth={30}
                    labelStyle={{
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      fill: '#000',
                    }}
                    labelPosition={0}
                    animate
                  />
                </div>
                <p>Initial Release: {film.release_date}</p>
                <p>Description:</p>
                <p>{film.overview}</p>
            </div>
        </div>
        </Link>
      ))}
    </Suspense>
    </div>
  );
}

export default Movie;
