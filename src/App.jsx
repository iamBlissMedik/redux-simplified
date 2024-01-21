import { useEffect } from "react";
import CartContainer from "./components/CartContainer";
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);

  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);
  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  return (
    <main>
      {isLoading ? (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <NavBar />
          <CartContainer />
        </>
      )}
      {isOpen && <Modal />}
    </main>
  );
}
export default App;
