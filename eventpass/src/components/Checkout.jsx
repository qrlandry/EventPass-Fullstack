import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../CartContext'

export default function Checkout(){
  const navigate = useNavigate()
  const { cartItems, setCartItems } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [discount, setDiscount] = useState(0)

  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.total), 0);
  const discountedTotal = (total * (1 - discount / 100)).toFixed(2);

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

  const handleKeyUp = (event) => {
    if (event.key === "ArrowUp") {
      setDiscount(15)
    }
  }

  const handleCardNumberChange = (event) => {
    let value = event.target.value.replace(/\D/g, '')
    value = value.replace(/(.{4})/g, '$1 ')
    event.target.value = value.trim()
  }

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp)
    return () => {
      document.removeEventListener("keyup", handleKeyUp)
    }
  })

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
              <h4>Total cost: ${discountedTotal}</h4>
              {discount > 0 && <p>You got a {discount}% discount!</p>}
              <form onSubmit={handlePurchase}>
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" 
                placeholder='ex. 4242 4242 4242 4242' 
                pattern="\d{4}\s?\d{4}\s?\d{4}\s?\d{4}" 
                maxLength={19} 
                onChange={handleCardNumberChange}
                required/>
                <label htmlFor="expirationDate">Expiration Date</label>
                <input type="text" id="expirationDate" 
                placeholder='ex. MM/YY' 
                pattern="(0[1-9]|1[0-2])\/[0-9]{2}" 
                maxLength={5}
                required />
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" 
                placeholder='ex. 424' 
                pattern="\d{2,3}" 
                maxLength={3}
                required />
                <button type="submit">Purchase</button>
              </form>
            </>
          )}
        </>
      )}
    </div>
  )
}
