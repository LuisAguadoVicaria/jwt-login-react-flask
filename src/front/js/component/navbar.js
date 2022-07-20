import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
				<Link className="btn btn-primary me-3" to="/login">Login</Link>
				<Link className="btn btn-primary me-3" to="/signup">Signup</Link>
				<Link className="btn btn-danger" to="/protected">Protected</Link>
				</div>
			</div>
		</nav>
	);
};
