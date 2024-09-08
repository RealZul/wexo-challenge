import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import './GenrePage.css';

const GenrePage = () => {
	//Destructure the genreName from the URL returned by useParams.
	const { genreName } = useParams();

	// variable initialization to useState(...) and function to update the var.
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [rangeEnd, setRangeEnd] = useState(10);

	// useEffect hook which can perform side effect in the components. Uses a callback function, and is only called when the compoenent is first loaded or when genreName or rangeEnd changes.
	useEffect(() => {
		//Async function to fetch data.
		const fetchMoviesByGenre = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byTags=genre:${genreName}&byProgramType=movie&range=1-${rangeEnd}`
				);
				setMovies(response.data.entries || []);
				setLoading(false);
			} catch (err) {
				setError(err);
				setLoading(false);
			}
		};

		fetchMoviesByGenre();
	}, [genreName, rangeEnd]);

	if (loading) return <p>Loading movies for {genreName}...</p>;

	if (error) return <p>Error fetching movies: {error.message}</p>;

	// Function to load more movies by increasing the range.
	const LoadMoreMovies = () => {
		setRangeEnd((prevRangeEnd) => prevRangeEnd + 10);
	};

	return (
		<div className="genre-page">
			<h1>{genreName} Movies</h1>
			<div className="movie-list">
				{movies.length > 0 ? (
					movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
				) : (
					<p>No movies available for this genre.</p>
				)}
				<div className="button-container">
					<button onClick={LoadMoreMovies}>Load more</button>
				</div>
			</div>
		</div>
	);
};

export default GenrePage;
