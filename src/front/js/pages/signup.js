import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [values, setValues] = useState({email:'user2',password:"pass"})
	const handleInputChange = (e) => {
		setValues({...values,  [e.target.name] : e.target.value})

	}
	const test = (e)=> {
		e.preventDefault()
		actions.sendSignup(values)
	}
	return (
		<div className="text-center mt-5">
			<h1>Signup Rigo!!</h1>
			{store.signupResponse.token==="" && "Signup error"}
			{store.loginResponse && <Navigate to="/protected"/>}
			<form onSubmit={test}>
				<input value={values.email} name="email" onChange={handleInputChange} onLoad={handleInputChange} />
				<input value={values.password} name="password" onChange={handleInputChange} onLoad={handleInputChange}/>
				<button type="submit" className="btn btn-primary">Enviar</button>
			</form>
		</div>
	);
};