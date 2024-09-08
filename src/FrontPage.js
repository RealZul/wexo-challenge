import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import './FrontPage.css';

const FrontPage = () => {
	// variable initialization to useState(...) and function to update the var.
	const [moviesByGenre, setMoviesByGenre] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const genres = [
		'Action',
		'Comedy',
		'Thriller',
		'War',
		'Romance',
		'Drama',
		'Crime',
		'Documentary',
		'Horror',
	];

	// useEffect hook which can perform side effect in the components. Uses a callback function, and is only called when the compoenent is first loaded.
	useEffect(() => {
		//Async function to fetch data.
		const fetchMoviesByGenres = async () => {
			try {
				setLoading(true);
				const moviesData = {};

				for (const genre of genres) {
					const response = await axios.get(
						`https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byTags=genre:${genre}&byProgramType=movie&range=1-5`
					);
					moviesData[genre] = response.data.entries || [];
				}

				setMoviesByGenre(moviesData);
				setLoading(false);
			} catch (err) {
				setError(err);
				setLoading(false);
			}
		};

		fetchMoviesByGenres();
	}, []);

	if (loading) {
		return <div>Loading movies...</div>;
	}

	if (error) {
		return <div>Error fetching movies: {error.message}</div>;
	}

	return (
		<div>
			<h1>Explore Movies by Genre</h1>
			{genres.map((genre) => (
				<div key={genre} className="explore-movies-section">
					<Link to={`/genre/${genre}`}>
						<h2>{genre} Movies</h2>
					</Link>
					<div className="movies-container">
						{moviesByGenre[genre]?.length > 0 ? (
							moviesByGenre[genre].map((movie) => (
								<MovieCard key={movie.guid} movie={movie} />
							))
						) : (
							<p>No movies found for {genre}</p>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default FrontPage;
