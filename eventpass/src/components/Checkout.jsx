import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../CartContext'

export default function Checkout(){
  const navigate = useNavigate()
  const { cartItems, setCartItems } = useContext(CartContext);

  const [isProcessing, setIsProcessing] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.total), 0);


  const handlePurchase = async () => {
    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      setCartItems([])
      setIsSuccess(true)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsProcessing(false)
    }
  }

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
              {isError && <p className="error-message">Payment failed. Please try again.</p>}
              <p>Enter your payment details:</p>
              <p>Total cost: ${total.toFixed(2)}</p>
              <form onSubmit={handlePurchase}>
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" required />
                <label htmlFor="expirationDate">Expiration Date</label>
                <input type="text" id="expirationDate" required />
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" required />
                <button type="submit">Purchase</button>
              </form>
            </>
          )}
        </>
      )}
    </div>
  )
}





