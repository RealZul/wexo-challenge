import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './FrontPage';
import GenrePage from './GenrePage';
import MovieDetails from './MovieDetails';
import NavBar from './components/NavBar';
import Wishlist from './Wishlist';

const App = () => {
	return (
		<Router>
			<NavBar />
			<Routes>
				<Route path="/" element={<FrontPage />} />
				<Route path="/genre/:genreName" element={<GenrePage />} />
				<Route path="/movie/:id" element={<MovieDetails />} />
				<Route path="/wishlist" element={<Wishlist />} />
			</Routes>
		</Router>
	);
};

export default App;
