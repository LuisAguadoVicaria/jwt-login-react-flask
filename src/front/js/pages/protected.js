import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link } from "react-router-dom";

export const Protected = () => {
	const { store, actions } = useContext(Context);
	useEffect( () => {
		actions.getProtected(actions.getToken());
	}, [])
	const handleLogout = ()=>{
		actions.removeToken();
		return(<Navigate to="/" replace={true} />)
	}
	return (
		<div className="text-center mt-5">
			<h1>Protected: {store.getResponse.message ? store.getResponse.username : 'Access not allowed, sorry'}</h1>
			<Link to="/" className="btn btn-danger" onClick={handleLogout}>Logout</Link>
		</div>
	);
};