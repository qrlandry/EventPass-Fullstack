import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import "../styles/Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [discount, setDiscount] = useState(0);

  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.total),
    0
  );
  const discountedTotal = (total * (1 - discount / 100)).toFixed(2);

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setCartItems([]);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowUp") {
      setDiscount(15);
    }
  };

  const handleCardNumberChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    value = value.replace(/(.{4})/g, "$1 ");
    event.target.value = value.trim();
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <div className="checkout-container">
      {isSuccess ? (
        <div className="success-message">
          <h2>Payment successful!</h2>
          <p>You will receive an email confirmation shortly.</p>
          <button onClick={() => navigate("/")}>Back to home</button>
        </div>
      ) : (
        <>
          <h2>Checkout</h2>
          {isProcessing ? (
            <p>Processing payment...</p>
          ) : (
            <>
              {isError && (
                <p className="error-message">
                  Payment failed. Please try again.
                </p>
              )}
              <div className="total">
                
                <h4>Total cost: ${discountedTotal}</h4>
                {discount > 0 && <p>You got a {discount}% discount!</p>}
              </div>
              <form onSubmit={handlePurchase}>
                <div class="input-container">
                <h3>Enter your payment details:</h3>
                <br/>
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    pattern="\d{4}[\s]\d{4}[\s]\d{4}[\s]\d{4}"
                    maxLength={19}
                    onChange={handleCardNumberChange}
                    required
                  />
                </div>

                <div class="input-container">
                  <label htmlFor="expirationDate">
                    Expiration Date (MM/YY)
                  </label>
                  <input
                    type="text"
                    id="expirationDate"
                    placeholder="MM/YY"
                    pattern="(?:0[1-9]|1[0-2])/[0-9]{2}"
                    maxLength={5}
                    required
                  />
                </div>
                <div class="input-container">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    pattern="\d{3}"
                    maxLength={3}
                    required
                  />
                </div>
                <button type="submit">Purchase</button>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
}
