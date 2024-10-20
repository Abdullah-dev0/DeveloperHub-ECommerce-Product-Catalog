import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import Spinner from "../UI/Spinner";
import { useSearchStore } from "../store/useSearchStore";

export default function Homepage() {
	const search = useSearchStore((state) => state.search);
	const [loading, setLoading] = useState(false);
	const [initialState, setInitialState] = useState([]);
	const [filteredState, setFilteredState] = useState([]);

	const fetchData = async () => {
		try {
			const result = await fetch("http://localhost:3001/api");
			const data = await result.json();
			setInitialState(data);
		} catch (e) {
			console.log(e.message);
		}
	};

	useEffect(() => {
		setLoading(true);
		let isMounted = true;
		const loadData = async () => {
			await fetchData();
			if (isMounted) {
				setLoading(false);
				isMounted = false;
			}
		};
		loadData();
	}, []);

	useEffect(() => {
		if (search.trim().length > 0 && initialState) {
			const result = initialState.filter(
				(each) =>
					each["title"].toLowerCase().includes(search.toLowerCase()) ||
					each["description"].toLowerCase().includes(search.toLowerCase()),
			);
			setFilteredState(result);
		}
	}, [search, initialState]);

	const handleClick = (id) => {
		window.location = `/product/${id}`;
	};

	const handleAddClick = () => {
		window.location = "/product";
	};

	return (
		<div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
			<div className="mb-6">
				<button
					onClick={handleAddClick}
					className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-200">
					Create a new product
				</button>
			</div>

			<div className="text-center mb-6">
				<h1 className="text-3xl font-bold mb-2">This is Home Page</h1>
				<p className="text-gray-600">Here are all the products we have in MongoDB.</p>
				<p className="text-gray-600">Click the card to view details, edit, or delete a product.</p>
			</div>

			<div className="flex flex-wrap justify-center w-full">
				{search.trim().length > 0 ? (
					filteredState.length > 0 ? (
						filteredState.map((each, index) => (
							<Card key={index} className="w-full sm:w-1/3 lg:w-1/4 m-2">
								<ul onClick={() => handleClick(each.id)} className="cursor-pointer">
									<li>
										Title: <b>{each.title}</b>
									</li>
									<li>
										Description: <b>{each.description}</b>
									</li>
									<li>
										Quantity: <b>{each.quantity || "Not Available"}</b>
									</li>
									<li>
										Price: <b>${each.price}</b>
									</li>
								</ul>
							</Card>
						))
					) : (
						<h3 className="text-red-600 my-12">No results found based on your search!</h3>
					)
				) : (
					initialState.length > 0 &&
					initialState.map((each, index) => (
						<Card
							key={index}
							title={each.title}
							description={each.description}
							quantity={each.quantity}
							price={each.price}
							handleClick={() => handleClick(each._id)}
						/>
					))
				)}
			</div>

			{loading && <Spinner />}
		</div>
	);
}
