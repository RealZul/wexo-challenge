import React from 'react';
import { Link } from 'react-router-dom';

// Function used for displaying movie information on the frontpage, genrepage and wishlist. Returns an image, title, and a view details button which links to movie details.
const MovieCard = ({ movie }) => {
	const defaultImage = 'https://via.placeholder.com/200x400'; // Placeholder image URL

	// Extracts the ID portion of the URL
	const movieId = movie.id.split('/').pop(); // This extracts the last part of the movie.id URL

	return (
		<div className="movie-card">
			<img src={defaultImage} alt={movie.title} className="movie-poster" />
			<h1>{movie.title}</h1>
			<Link to={`/movie/${movieId}`} className="view-details-btn">
				View Details
			</Link>
		</div>
	);
};

export default MovieCard;
