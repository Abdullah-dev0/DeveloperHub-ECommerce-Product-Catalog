import React from "react";

export default function Input({
	label,
	type = "text",
	id,
	min,
	step,
	value,
	placeholder = "",
	minLength,
	handleChange,
	className = "",
}) {
	return (
		<div className={`mb-4 ${className}`}>
			<label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
				{label}
			</label>
			<input
				id={id}
				type={type}
				min={min}
				step={step}
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
				minLength={minLength}
				required
				className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
			/>
		</div>
	);
}
