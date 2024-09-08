import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';
import { addToWishlist } from './Wishlist';

const MovieDetails = () => {
	//Destructure the id from the URL returned by useParams.
	const { id } = useParams();

	// variable initialization to null and function to update the var.
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// useEffect hook which can perform side effect in the components. Uses a callback function, and is only called when the compoenent is first loaded or when id changes.
	useEffect(() => {
		//Async function to fetch data.
		const fetchMovieDetails = async () => {
			try {
				const response = await axios.get(
					`https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${id}?form=json`
				);
				setMovie(response.data);
				setLoading(false);
			} catch (err) {
				setError(err);
				setLoading(false);
			}
		};

		fetchMovieDetails();
	}, [id]);

	if (loading) return <p>Loading movie details...</p>;
	if (error) return <p>Error fetching movie details: {error.message}</p>;
	if (!movie) return <p>No movie details available.</p>;

	// Helper function to convert runtime from seconds to hours and minutes.
	const formatRuntime = (runtimeInSeconds) => {
		const hours = Math.floor(runtimeInSeconds / 3600);
		const minutes = Math.floor((runtimeInSeconds % 3600) / 60);
		return `${hours}h ${minutes}m` || 'No information available';
	};

	//Variable to store directors. Uses ?. to check if movie.plprogram$credits exists.
	const directors =
		movie.plprogram$credits?.filter(
			//Adds a director based on credit, and checks if the director is already in the list.
			(credit, index, self) =>
				credit.plprogram$creditType === 'director' &&
				index ===
					self.findIndex(
						(c) => c.plprogram$personName === credit.plprogram$personName
					)
		) || [];

	//Same logic as var directors.
	const actors =
		movie.plprogram$credits?.filter(
			(credit, index, self) =>
				credit.plprogram$creditType === 'actor' &&
				index ===
					self.findIndex(
						(c) => c.plprogram$personName === credit.plprogram$personName
					)
		) || [];

	// Get the genre from plprogram$tags where plprogram$scheme is "genre".
	const genres = movie.plprogram$tags?.filter(
		(tag) => tag.plprogram$scheme === 'genre'
	);

	// Backdrop and Poster URLs
	const posterUrl = 'https://via.placeholder.com/300x400';
	const backdropUrl = 'https://via.placeholder.com/200x200';

	const description =
		movie.description ||
		movie.plprogram$longDescription ||
		'No description available.';

	return (
		<div
			className="movie-details-container"
			style={{ backgroundImage: `url(${backdropUrl})` }}
		>
			<div className="movie-header">
				<img src={posterUrl} alt={movie.title} className="movie-poster" />
				<div className="movie-info">
					<h1>{movie.title}</h1>
					<p>
						<strong>Year:</strong> {movie.plprogram$year}
					</p>
					<p>
						<strong>Runtime:</strong> {formatRuntime(movie.plprogram$runtime)}
					</p>
					<p>
						<strong>Description: </strong>
						{description}
					</p>

					{/* Genres */}
					<div>
						<strong>Genre(s): </strong>
						{genres?.map((genre, index) => (
							<span key={index}>
								{genre.plprogram$title}
								{index < genres.length - 1 ? ', ' : ''}
							</span>
						))}
					</div>

					{/* Directors */}
					<div>
						<strong>Director(s): </strong>
						{directors.length > 0 ? (
							directors?.map((director, index) => (
								<span key={index}>
									{director.plprogram$personName}
									{index < directors.length - 1 ? ', ' : ''}
								</span>
							))
						) : (
							<span>No information available.</span>
						)}
					</div>

					{/* Actors */}
					<div>
						<strong>Actors: </strong>
						{actors.length > 0 ? (
							actors.map((actor, index) => (
								<span key={index}>
									{actor.plprogram$personName}
									{index < actors.length - 1 ? ', ' : ''}
								</span>
							))
						) : (
							<span>No information available.</span>
						)}
					</div>
				</div>
			</div>
			<button onClick={() => addToWishlist(movie)}>Add to Wishlist</button>
		</div>
	);
};

export default MovieDetails;
