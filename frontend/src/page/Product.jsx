import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProductConstant } from "../constant/constant";
import Input from "../component/Input";

export default function Product() {
	const [data, setData] = useState(ProductConstant);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3001/api/product";
			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (res.status === 200) {
				alert("Product added successfully");
				window.location = "/";
			}
		} catch (e) {
			alert("Something goes wrong, please check!");
			console.log(e);
		}
	};

	const handleChange = (e) => {
		const newData = { ...data };
		newData[e.target.id] = e.target.value;
		setData(newData);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg max-w-md w-full">
				<h3 className="text-xl font-semibold text-center mb-6">Add a Product</h3>

				<Input
					label="Title"
					id="title"
					type="text"
					value={data["title"]}
					handleChange={handleChange}
					className="mb-4"
				/>

				<Input
					label="Description"
					id="description"
					type="text"
					value={data["description"]}
					handleChange={handleChange}
					className="mb-4"
				/>

				<Input
					label="Quantity"
					id="quantity"
					type="number"
					min="1"
					step="1"
					value={data["quantity"]}
					handleChange={handleChange}
					className="mb-4"
				/>

				<Input
					label="Price"
					id="price"
					type="number"
					min="0"
					step="0.01"
					value={data["price"]}
					handleChange={handleChange}
					className="mb-4"
				/>

				<button
					type="submit"
					className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300">
					Submit
				</button>
			</form>
		</div>
	);
}
