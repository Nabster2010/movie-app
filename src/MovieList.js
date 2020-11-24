import React from 'react';
import AddToFavourite from './AddToFavourite';
import { useHistory } from 'react-router-dom';

const MovieList = (props) => {
	const history = useHistory();
	const FavouriteComponent = props.FavouriteComponent;
	return (
		<>
			{props.movies.map((movie, index) => (
				<div
					className='img-container d-flex justify-content-start m-3 '
					key={index}
					onClick={() => history.push(`/${movie.imdbID}`)}
				>
					<img src={movie.Poster} alt='movie' />
					<div
						className='overlay d-flex justify-content-center align-items-center'
						onClick={() => props.handleFavouriteClick(movie)}
					>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
