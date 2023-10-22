import { useContext, useState } from 'react';
import products from '../mocks/products.json';
import { ThemeContext } from '../components/context/ThemeContext.jsx';
import { CartContext } from '../components/context/CartContext.jsx';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons';
import { Cart } from './Cart';
import PropTypes from 'prop-types';

function Products({ onProductId }) {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { cart, removeFromCart } = useContext(CartContext);


	console.log(`cart in products: ${cart}`);

	const [category, setCategory] = useState('all');
	const [priceRange, setPriceRange] = useState('all');

	//this function will filter the products based on the category and price range
	const filterProducts = (product) => {
		//if the category is all and the price range is all, return true
		if (category === 'all' && priceRange === 'all') {
			return true;
			//if the category is all and the price range is not all, return true if the price is in the range
		} else if (category === 'all') {
			return (
				//split the price range into an array and check if the price is in the range
				product.price >= parseInt(priceRange.split('-')[0]) &&
				product.price <= parseInt(priceRange.split('-')[1])
			);
			//if the category is not all and the price range is all, return true if the category matches
		} else if (priceRange === 'all') {
			return product.category === category;
		} else {
			return (
				//split the price range into an array and check if the price is in the range
				product.category === category &&
				product.price >= parseInt(priceRange.split('-')[0]) &&
				product.price <= parseInt(priceRange.split('-')[1])
			);
		}
	};

	const categories = [
		...new Set(products.products.map((product) => product.category)),
	];

	return (
		<>
			<header>
				<Cart />
				<button onClick={toggleTheme}>Toggle Theme</button>
				<p className='theme-indicator'>Current theme: {theme}</p>

				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value='all'>All Categories</option>
					{categories.map((cat) => (
						<option
							key={cat}
							value={cat}
						>
							{cat}
						</option>
					))}
				</select>
				<select
					value={priceRange}
					onChange={(e) => setPriceRange(e.target.value)}
				>
					<option value='all'>All Prices</option>
					<option value='0-50'>$0 - $50</option>
					<option value='50-200'>$50 - $200</option>
					<option value='200-500'>$200 - $500</option>
					<option value='500-1000'>$500 - $1000</option>
					<option value='1000-5000'>$1000 - $5000</option>
				</select>
			</header>
			<div className='products'>
				{products.products.filter(filterProducts).map((product) => (
					<div
						key={product.id}
						className='product'
					>
						<h3>{product.title}</h3>
						<img
							src={product.thumbnail}
							alt={product.title}
						/>
						<p>{`$${product.price}`}</p>
						{
							cart.some((item) => item.id === product.id) ? (
								<button
									className='button is-warning'
									onClick={() => removeFromCart(product)}
								>Remove
									<RemoveFromCartIcon />
								</button>
							) : (
								<button
									className='button is-primary'
									onClick={() => onProductId(product.id)}
								>Add
									<AddToCartIcon />
								</button>
							)
						}
					</div>
				))}
			</div>
		</>
	);
}

export default Products;

Products.propTypes = {
	onProductId: PropTypes.func.isRequired,
};
