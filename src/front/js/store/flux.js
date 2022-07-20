const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			loginResponse: false,
			signupResponse: false,
			getResponse: false,
		},
		actions: {
			setToken: (token) => {
				localStorage.setItem('access_token_jwt', token);

			},


			getToken: () => {
				return localStorage.getItem('access_token_jwt');
			},

			removeToken: () => {
				setStore({ loginResponse: false, signupResponse: false });
				return localStorage.setItem('access_token_jwt', '');
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			getProtected: async (token) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/protected",
					{
						method: 'GET', headers: {
						  'Content-Type': 'application/json',
						  'Authorization': 'Bearer '+token,
						} })
						const data = await resp.json()
						setStore({ getResponse: data })
						// don't forget to return something, that is how the async resolves
						return data
					
					// don't forget to return something, that is how the async resolves
					return data
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			sendLogin: async (form) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/login",
					{
						method: 'POST', headers: {
						  'Content-Type': 'application/json'
						}, body: JSON.stringify( {email: form.email, password: form.password} )})
						const data = await resp.json()
						localStorage.setItem('access_token_jwt', data.token);
						setStore({ loginResponse: data.message, signupResponse: data.message })
						// don't forget to return something, that is how the async resolves
						return data
					
					// don't forget to return something, that is how the async resolves
					return data
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			sendSignup: async (form) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup",
					{
						method: 'POST', headers: {
						  'Content-Type': 'application/json'
						}, body: JSON.stringify( {email: form.email, password: form.password} )})
						const data = await resp.json()
						localStorage.setItem('access_token_jwt', data.token);
						setStore({ signupResponse: data, loginResponse: data.message })
						// don't forget to return something, that is how the async resolves
						return data
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
