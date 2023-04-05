import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../CartContext'
import '../styles/Cart.css'

export default function Cart(){

  const { cartItems, setCartItems } = useContext(CartContext);


  const validPromoCodes = [
    'spring15', 'crowdsurf10', 'welcome15', 'employee25'
  ]
  
  //usecontext for tickets added to cart
  const [ total, setTotal ] = useState(0)
  const [ totalDiscounted, setTotalDiscounted ] = useState(0)
  const [ discountAttempt, setDiscountAttempt ] = useState('')
  const [ isDiscounted, setIsDiscounted ] = useState(false)
  const [ invalidCode, setInvalidCode ] = useState(false)
  const [ discountApplied, setDiscountApplied ] = useState(null)

  const calculateTotal = () => {
    let totalPrice = 0
    for(let i = 0; i < cartItems.length; i++){
    totalPrice += parseFloat(cartItems[i]['total'])
    }
    setTotal(totalPrice)
    isDiscounted ? setTotalDiscounted((totalPrice * (100 - discountApplied)/100).toFixed(2)) : 
    setTotalDiscounted(totalPrice)
  }

  useEffect(() => {
    calculateTotal()
  },[cartItems, isDiscounted])

  const applyDiscount = () => {
    if(validPromoCodes.includes(discountAttempt)){
      setDiscountApplied(parseInt(discountAttempt.slice(-2)))
      setIsDiscounted(true)
      setInvalidCode(false)
      setDiscountAttempt("")
    }else{
      setInvalidCode(true)
      setIsDiscounted(false)
    }
  }


  //need to convert this into a crUd: update function to remove tickets from user's tickets table
  const handleCancel = (index) => {
    setCartItems(cartItems.filter((_,i) => i !== index))
  }

  return (
    <div className="cart-container">

      <div className="my-bag">
        <h4>My Tickets</h4>
        {
          cartItems.map((item,index) => {
            return(
              <div className="cart-item">
                <img src={item.photo_url} alt={item.event} style={{width: '10vw', height: '11vh', marginRight: '1rem'}}/>
                <div className="item-details">
                  <p className="item-details">${item.pricePerTicket}</p>
                  <p className="item-details">{item.event}</p>
                  <p className="item-details">{item.date}</p>
                  <p className="item-details">Quantity: {item.numTickets}</p>
                </div>
                <div className='item-cancel' key={index} onClick={()=> handleCancel(index)}>✕</div>
              </div>
            )
          })
        }
        <NavLink to="/" className="menu-item" style={{color: 'black'}}>← continue shopping</NavLink>
      </div>


      <div className="total">
        <h4>ORDER SUMMARY</h4>
        <div className="total-form">
          <h5 style={{justifyContent: 'space-between'}}>subtotal ${total.toFixed(2)}</h5>
          <h5>fees $0</h5>
          {
            isDiscounted ? 
            <div className="discounted">
              <h5>Discount {discountApplied}%</h5>
              <h5>ORDER TOTAL ${totalDiscounted}</h5>
            </div> : <h5>ORDER TOTAL ${total.toFixed(2)}</h5>
          }
          
        </div>
        <p style={{fontSize: '1.2vh'}}>Have a promo code?</p>
        <input type="text" className="discount" id="discount-input" value={discountAttempt} onInput={e => setDiscountAttempt(e.target.value)}/><button className='discount' id="discount-button" onClick={applyDiscount}>Apply</button>
        {
          invalidCode ? 
          <div className="invalid-code">
            <p style={{color: 'red', fontSize: '1vh', marginTop: '0'}}>Please enter a valid code</p>
          </div> : null
        }
    
        {/* need to create handlesubmit function to redirect to checkout component for stripe */}
        {/* take total and total discounted state to checkout page */}
        <button id="checkout-button">PROCEED TO CHECKOUT</button>
      </div>

    </div>
  )
}
