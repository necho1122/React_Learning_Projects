import { createContext, useState, useEffect } from 'react';
import products from '../../mocks/products.json';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const addToCart = (product) => {
		const productInCartIndex = cart.findIndex((item) => item.id === product.id);
		console.log(`id en context: ${productInCartIndex}`);

		if (productInCartIndex >= 0) {
			const newCart = [...cart];
			newCart[productInCartIndex].quantity += 1;
			return setCart(newCart);
		}

		setCart((prev) => [...prev, { ...product, quantity: 1 }]);
		console.log(`SetCart: ${cart}`);
	};

	const removeFromCart = (product) => {
		const newCart = cart.filter((item) => item.id !== product.id);
		setCart(newCart);
	};

	const clearCart = () => {
		setCart([]);
	};

	const getProductId = (productId) => {
		const selectedProduct = products.products.find(
			(product) => product.id === productId
		);
		setCart((prev) => [...prev, { ...selectedProduct, quantity: 1 }]);
		console.log(selectedProduct);
	};

	useEffect(() => {
		const storedCart = localStorage.getItem('cart');
		if (storedCart) {
			setCart(JSON.parse(storedCart));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	console.log(`cart en context: ${cart}`);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				clearCart,
				getProductId,
				removeFromCart,
				setCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
