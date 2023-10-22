import { useId, useContext, useState } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import { CartContext } from '../components/context/CartContext.jsx'
import PropTypes from 'prop-types'
import './Cart.css'

function ProductItemQty({ initialQuantity }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <footer>
      <small>Qty: {quantity}</small>
      <button onClick={incrementQuantity}>+</button>
    </footer>
  );
}

ProductItemQty.propTypes = {
  initialQuantity: PropTypes.number.isRequired,
};


export function Cart () {
  const cartCheckboxId = useId()
  const { cart, clearCart } = useContext(CartContext)

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <li className='cart-item' key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
              />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>

              <ProductItemQty initialQuantity={product.quantity} />
            </li>
          ))}
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}