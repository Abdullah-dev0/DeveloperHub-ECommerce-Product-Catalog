const Card = ({ title, description, quantity, price, handleClick }) => {
	return (
		<div
			className="w-full sm:w-1/3 lg:w-1/4 m-4 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-2xl hover:scale-105 transform transition-all duration-300 cursor-pointer"
			onClick={handleClick}>
			{/* Product Image */}
			<img
				src="https://picsum.photos/200" // Placeholder image from Picsum
				// Placeholder image, replace with actual product image if available
				alt="Product"
				className="w-full h-48 object-cover rounded-t-lg"
			/>

			{/* Product Details */}
			<div className="p-4">
				{/* Title */}
				<h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{title}</h2>

				{/* Description */}
				<p className="text-sm text-gray-600 mb-4 truncate">{description}</p>

				{/* Quantity & Price */}
				<div className="flex justify-between items-center mb-4">
					<span className="text-sm font-medium text-gray-700">Quantity:</span>
					<span className="text-sm text-gray-900">{quantity || "Not Available"}</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-sm font-medium text-gray-700">Price:</span>
					<span className="text-lg font-bold text-gray-900">${price}</span>
				</div>
			</div>
		</div>
	);
};

export default Card;
