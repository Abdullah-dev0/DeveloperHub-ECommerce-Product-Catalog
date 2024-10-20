import React from "react";
import { Navigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchStore } from "../store/useSearchStore";

export default function Navbar() {
	const setSearch = useSearchStore((state) => state.setSearch);

	const handleChange = (e) => {
		const inputValue = e.target.value.toLowerCase();
		setSearch(inputValue);
	};

	const userHandler = () => {
		window.location = "/";
	};

	return (
		<nav className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
			<div className="flex items-center cursor-pointer" onClick={userHandler}>
				<PersonIcon className="text-white mr-2 hover:text-gray-400 transition-colors duration-300" />
				<span className="font-bold text-lg">User</span>
			</div>
			<div className="relative flex items-center">
				<input
					type="text"
					placeholder="Search by title"
					id="search-input"
					onChange={handleChange}
					className="py-2 pl-10 pr-4 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<SearchIcon className="absolute left-3 text-gray-400" />
			</div>
		</nav>
	);
}
