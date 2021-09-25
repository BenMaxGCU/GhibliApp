import React from 'react';
import './Card.css';

function Card({ data }) { 
  return !data ? (
      <div>

      </div>
  )
  : (
    <div className='cards'>
      {data.map((film) => (
        <div className='card' key={film.id}>
            <div className="title-bg">
                <h1>{film.title}</h1>
                <h1>{film.original_title}</h1>
            </div>
            <p>Director: {film.director}</p>
            <p>Initial Release: {film.release_date}</p>
            <p>Description:</p>
            <p>{film.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;
