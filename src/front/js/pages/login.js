import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useLocation  } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [values, setValues] = useState({email:'user2',password:"pass"})
	const handleInputChange = (e) => {
		setValues({...values,  [e.target.name] : e.target.value})

	}
	const submit = (e)=> {
		e.preventDefault()
		actions.sendLogin(values)
	}
	const located = useLocation()
	return (
		<div className="text-center mt-5">
			<h1>Login Rigo!!</h1>
			{JSON.stringify(store.loginResponse)}
			{store.loginResponse==="Incorrect password" && store.loginResponse ? "" : store.loginResponse && <Navigate to="/protected"/>}
			<form onSubmit={submit}>
				<input value={values.email} name="email" onChange={handleInputChange} onLoad={handleInputChange} />
				<input value={values.password} name="password" onChange={handleInputChange} onLoad={handleInputChange}/>
				<button type="submit" className="btn btn-primary">Enviar</button>
				</form>
		</div>
	);
};