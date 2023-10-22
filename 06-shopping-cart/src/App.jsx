import Products from './components/Products';
import { useContext } from 'react';
import { ThemeContext } from './components/context/ThemeContext';
import './App.css';
import { CartContext } from './components/context/CartContext.jsx';

function App() {
	const { theme } = useContext(ThemeContext);
	const { getProductId } = useContext(CartContext);

	return (
			<div className={theme === 'light' ? 'light' : ''}>
				<h1>Shopping cart 🛒</h1>
				<Products onProductId={getProductId} />
			</div>
	);
}

export default App;
