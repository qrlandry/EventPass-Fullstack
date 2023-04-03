import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Cart.css'

export default function Cart(){
  const [examples, setExamples] = useState([
    {
      event: "Some Band",
      venue: "Raymond James Stadium",
      date: "April 1, 2023",
      price: 49.99,
      quantity: 2,
      url: "https://media.istockphoto.com/id/1247853982/photo/cheering-crowd-with-hands-in-air-at-music-festival.jpg?s=612x612&w=0&k=20&c=rDVKf3hTryuVgUZUme9wuwfsegfJptAvVEKsDwppvJc="
    },
    {
      event: "Some Comedian",
      venue: "Met Life Stadium",
      date: "April 22, 2023",
      price: 31.99,
      quantity: 1,
      url: "https://media.npr.org/assets/img/2017/12/21/_harlan_nprmusic10years-149_wide-78a7596027f7b4c023a21ad85f078e8a4165c230-s800-c85.jpg"
    }
  ])

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
    for(let i = 0; i < examples.length; i++){
    totalPrice += (examples[i]['price']) * Number(examples[i]['quantity'])
    }
    setTotal(totalPrice)
    isDiscounted ? setTotalDiscounted((totalPrice * (100 - discountApplied)/100).toFixed(2)) : 
    setTotalDiscounted(totalPrice)
  }

  useEffect(() => {
    calculateTotal()
  },[examples, isDiscounted])

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
    setExamples(examples.filter((_,i) => i !== index))
  }

  return (
    <div className="cart-container">

      <div className="my-bag">
        <h4>My Tickets</h4>
        {
          examples.map((example,index) => {
            return(
              <div className="cart-item">
                <img src={example.url} alt={example.event} style={{width: '10vw', height: '10vh', marginRight: '1rem'}}/>
                <div className="item-details">
                  <p className="item-details">${example.price}</p>
                  <p className="item-details">{example.event}, {example.venue}</p>
                  <p className="item-details">{example.date}</p>
                  <p className="item-details">Quantity: {example.quantity}</p>
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
          <h5 style={{justifyContent: 'space-between'}}>subtotal ${total}</h5>
          <h5>fees $0</h5>
          {
            isDiscounted ? 
            <div className="discounted">
              <h5>Discount {discountApplied}%</h5>
              <h5>ORDER TOTAL ${totalDiscounted}</h5>
            </div> : <h5>ORDER TOTAL ${total}</h5>
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
