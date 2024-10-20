import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../UI/Spinner";

export default function ProductDetails() {
	const params = useParams();
	const id = params.id;
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [productInfo, setProductInfo] = useState({});
	const [tempInfo, setTempInfo] = useState({});

	const fetchData = async (id) => {
		try {
			const result = await fetch(`http://localhost:3001/api/product/${id}`);
			const data = await result.json();
			setProductInfo(data);
		} catch (e) {
			console.error(e.message);
		}
	};

	useEffect(() => {
		setLoading(true);
		let isMounted = true;

		const loadData = async () => {
			await fetchData(id);
			if (isMounted) {
				setLoading(false);
				isMounted = false;
			}
		};

		loadData();

		return () => {
			setProductInfo({});
			setTempInfo({});
			setShowEditForm(false);
			setLoading(false);
		};
	}, [id]);

	useEffect(() => {
		if (productInfo) {
			setTempInfo({ ...productInfo });
		}
	}, [productInfo]);

	// Toggle edit form visibility
	const toggleEditForm = () => {
		setShowEditForm(!showEditForm);
	};

	// Handle input change during product edit
	const handleChange = (e) => {
		const { id, value } = e.target;
		setTempInfo((prevState) => ({ ...prevState, [id]: value }));
	};

	// Submit edited product details
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:3001/api/product/edit/${id}`;
			await Axios.post(url, {
				title: tempInfo.title,
				description: tempInfo.description,
				quantity: tempInfo.quantity,
				price: tempInfo.price,
			}).then(() => {
				alert("Product updated successfully!");
				navigate(0); // Refresh page
			});
		} catch (e) {
			alert("An error occurred. Please try again.");
			console.error(e);
		}
	};

	// Delete product
	const deleteProduct = async () => {
		try {
			const url = `http://localhost:3001/api/product/delete/${id}`;
			await Axios.delete(url).then(() => {
				alert("Product deleted successfully!");
				navigate("/"); // Redirect to home
			});
		} catch (e) {
			alert("An error occurred. Please try again.");
			console.error(e);
		}
	};

	return (
		<div className="container mx-auto my-8 p-6 bg-white rounded shadow-lg">
			{loading ? (
				<Spinner />
			) : (
				<>
					{productInfo && (
						<div className="max-w-xl mx-auto p-6 rounded-lg transition-transform duration-300 transform hover:scale-105">
							<h1 className="text-3xl font-bold text-center mb-4 text-gray-800">{productInfo.title}</h1>
							<div className="">
								<div className="flex justify-center items-center">
									<img
										src={productInfo.image || "https://via.placeholder.com/150"}
										alt={productInfo.title}
										className="rounded-lg shadow-lg"
									/>
								</div>

								<div className="flex flex-col justify-center">
									<p className="text-gray-700 mb-4">
										<strong>Description:</strong> {productInfo.description}
									</p>
									<p className="text-gray-700 mb-4">
										<strong>Quantity:</strong> {productInfo.quantity}
									</p>
									<p className="text-gray-700 mb-4">
										<strong>Price:</strong>{" "}
										<span className="text-lg font-semibold text-green-600">${productInfo.price}</span>
									</p>

									<div className="flex justify-center md:justify-end space-x-4 mt-4">
										<button
											onClick={toggleEditForm}
											className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
											{showEditForm ? "Close Edit" : "Edit Product"}
										</button>
										<button
											onClick={() => {
												if (window.confirm("Are you sure you want to delete this product?")) {
													deleteProduct();
												}
											}}
											className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
											Delete Product
										</button>
									</div>
								</div>
							</div>
						</div>
					)}

					{showEditForm && (
						<div className="bg-gray-100 p-6 rounded-lg shadow-md mt-8">
							<h2 className="text-xl font-semibold mb-4">Edit Product</h2>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label htmlFor="title" className="block text-gray-600 mb-1">
										Title
									</label>
									<input
										type="text"
										id="title"
										value={tempInfo.title}
										onChange={handleChange}
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								<div>
									<label htmlFor="description" className="block text-gray-600 mb-1">
										Description
									</label>
									<textarea
										id="description"
										value={tempInfo.description}
										onChange={handleChange}
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
										rows="4"></textarea>
								</div>

								<div>
									<label htmlFor="quantity" className="block text-gray-600 mb-1">
										Quantity
									</label>
									<input
										type="number"
										id="quantity"
										min="1"
										value={tempInfo.quantity}
										onChange={handleChange}
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								<div>
									<label htmlFor="price" className="block text-gray-600 mb-1">
										Price
									</label>
									<input
										type="number"
										id="price"
										min="0"
										step="0.01"
										value={tempInfo.price}
										onChange={handleChange}
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								<div className="flex justify-between">
									<button
										type="button"
										onClick={toggleEditForm}
										className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg">
										Cancel
									</button>
									<button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
										Save Changes
									</button>
								</div>
							</form>
						</div>
					)}

					<div className="mt-8">
						<Link to="/" className="inline-block bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700">
							Go to Home Page
						</Link>
					</div>
				</>
			)}
		</div>
	);
}
