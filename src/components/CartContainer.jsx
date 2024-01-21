import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";

import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(openModal());
  };
  return (
    <>
      {amount < 1 ? (
        <section className="cart">
          <header>
            <h2>Your Cart</h2>
            <h4 className="empty-cart">is currently empty</h4>
          </header>
        </section>
      ) : (
        <section className="cart">
          <header>
            <h2>Your Cart</h2>
          </header>
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <footer>
            <hr />
            <div className="cart-total">
              <h4>
                Total <span>${total.toFixed(2)}</span>
              </h4>
            </div>
            <button className="btn clear-btn" onClick={handleClearCart}>
              clear cart
            </button>
          </footer>
        </section>
      )}
    </>
  );
};

export default CartContainer;
