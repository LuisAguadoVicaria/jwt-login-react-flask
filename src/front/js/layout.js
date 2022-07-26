import React from "react";
import { BrowserRouter, Route, Routes, Navigate, HashRouter } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Protected } from "./pages/protected";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
    <React.Fragment>

        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            <Route path="protected" element={<Protected />} />
          </Routes>

          <Footer />
        </ScrollToTop>
    </React.Fragment>
  );
};

export default injectContext(Layout);
