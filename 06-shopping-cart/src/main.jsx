
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './components/context/ThemeContext.jsx';
import { CartProvider } from './components/context/CartContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
			<ThemeProvider>
			<CartProvider>
				<App />
			</CartProvider>
			</ThemeProvider>
);
