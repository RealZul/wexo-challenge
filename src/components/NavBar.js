import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

//Simple navigation bar for Home and Wishlist.

const NavBar = () => {
	return (
		<nav className="navbar">
			<ul className="navbar-links">
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="Wishlist">Wishlist</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
