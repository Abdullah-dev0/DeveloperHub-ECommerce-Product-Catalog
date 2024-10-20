import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./component/Navbar";
import Errorpage from "./page/Errorpage";
import Homepage from "./page/Homepage";
import Product from "./page/Product";
import ProductList from "./page/ProductList";

// Create a router configuration
const router = createBrowserRouter([
	{
		path: "/",
		element: <Homepage />,
	},
	{
		path: "product",
		element: <Product />,
	},
	{
		path: "product/:id",
		element: <ProductList />,
	},
	{
		path: "/404",
		element: <Errorpage />,
	},
	{
		path: "*", // Catch-all route for 404
		element: <Errorpage />,
	},
]);

function App() {
	return (
		<>
			<Navbar />
			<RouterProvider router={router} />
		</>
	);
}

export default App;
