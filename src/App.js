import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import MovieList from './MovieList';
import MovieListHeader from './MovieListHeader';
import SearchBox from './SearchBox';
import AddToFavourite from './AddToFavourite';
import RemoveFromFavourite from './RemoveFromFavourite';
import MovieItem from './MovieItem';
function App() {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	useEffect(() => {
		requestMovies();
	}, [searchValue]);
	useEffect(() => {
		const savedFavourites = localStorage.getItem('movie-app-favourites');
		setFavourites(JSON.parse(savedFavourites) || []);
	}, []);
	useEffect(() => {
		saveToLocalStorage();
	}, [favourites]);
	const requestMovies = async () => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=7e41799d`;
		const res = await axios.get(url);
		if (res.data.Search) {
			setMovies(res.data.Search);
		}
	};
	const addToFavourites = (movie) => {
		const exist = favourites.every((item) => item.imdbID !== movie.imdbID);
		if (exist) {
			setFavourites([...favourites, movie]);
		}
	};
	const removeFromFavourites = (item) => {
		setFavourites(favourites.filter((movie) => movie.imdbID !== item.imdbID));
	};
	const saveToLocalStorage = () => {
		localStorage.setItem('movie-app-favourites', JSON.stringify(favourites));
	};

	return (
		<div className='container-fluid movie-app'>
			<Router>
				<Switch>
					<Route
						exact
						path='/:id'
						render={() => <MovieItem movies={movies} />}
					/>
					<Route path=''>
						<div className='row d-flex align-items-center mt-3 mb-3'>
							<MovieListHeader header='Movies' />
							<SearchBox
								searchValue={searchValue}
								setSearchValue={setSearchValue}
							/>
						</div>
						<div className='row'>
							<MovieList
								movies={movies}
								FavouriteComponent={AddToFavourite}
								handleFavouriteClick={addToFavourites}
							/>
						</div>
						<div className='row mt-3 mb-3'>
							<MovieListHeader header='Favourites' />
						</div>
						<div className='row movie-app'>
							<MovieList
								movies={favourites}
								FavouriteComponent={RemoveFromFavourite}
								handleFavouriteClick={removeFromFavourites}
							/>
						</div>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
