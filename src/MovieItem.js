import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const MovieItem = (props) => {
	let { id } = useParams();
	const [movie, setMovie] = useState(null);
	const getMovieById = async () => {
		const url = `http://www.omdbapi.com/?i=${id}&apikey=7e41799d`;
		const res = await Axios.get(url);
		setMovie(res.data);
	};
	useEffect(() => {
		getMovieById();
	}, [id]);

	return movie ? (
		<>
			<div className='row d-flex flex-column'>
				<h3>{movie.Title} </h3>
				<h4> {movie.Year} </h4>
			</div>
			<div className='row'>
				<img src={movie.Poster} alt='movie' />
			</div>
		</>
	) : (
		<div
			className='d-flex justify-content-center align-items-center'
			style={{ height: '90vh' }}
		>
			<div
				className='spinner-border '
				style={{ width: '6rem', height: '6rem' }}
				role='status'
			>
				<span className='sr-only'>Loading...</span>
			</div>
		</div>
	);
};

export default MovieItem;
