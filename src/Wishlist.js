import React, { useState, useEffect } from 'react';
import './Wishlist.css';
import MovieCard from './components/MovieCard';

// Add to wishlist function.
export const addToWishlist = (movie) => {
	// Retrieve wishlist from localStorage (or initialize as empty array).
	let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

	// Check if movie is already in the wishlist to avoid duplicates.
	const isAlreadyInWishlist = wishlist.some((item) => item.id === movie.id);
	if (!isAlreadyInWishlist) {
		// Push movie to wishlist.
		wishlist.push(movie);
		// Save updated wishlist to localStorage.
		localStorage.setItem('wishlist', JSON.stringify(wishlist));
		alert(`${movie.title} has been added to your wishlist!`);
	} else {
		alert(`${movie.title} is already in your wishlist.`);
	}
};

const Wishlist = () => {
	// variable initialization to empty array and function to update the var.
	const [wishlist, setWishlist] = useState([]);

	// useEffect hook which can perform side effect in the components. Uses a callback function, and is only called when the compoenent is first loaded.
	useEffect(() => {
		// Retrieve wishlist from localStorage when the component mounts.
		const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
		setWishlist(savedWishlist);
	}, []);

	const removeFromWishlist = (movieId) => {
		// Create a new array updatedWishlist due to filter.
		const updatedWishlist = wishlist.filter((movie) => movie.id !== movieId);
		// Update the local state.
		setWishlist(updatedWishlist);
		// Update localStorage with the new wishlist.
		localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
	};

	return (
		<div className="wishlist-page">
			<h1>Your Wishlist</h1>
			<div className="movie-list">
				{wishlist.length > 0 ? (
					wishlist.map((movie) => (
						<div key={movie.id} className="movie-card">
							<MovieCard movie={movie} />
							<button onClick={() => removeFromWishlist(movie.id)}>
								Remove
							</button>
						</div>
					))
				) : (
					<p>Your wishlist is empty.</p>
				)}
			</div>
		</div>
	);
};
export default Wishlist;
