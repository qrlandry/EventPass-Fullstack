import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Cart.css'

export default function Cart(){
  const examples = [
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
  ]
  //usecontext for tickets added to cart
  const [ total, setTotal ] = useState(0)

  //need to fix this 
  const calculateTotal = () => {
    examples.forEach((example) => {
      setTotal(total + (example['price'] * example['quantity']))
    })
  }

  useEffect(() => {
    calculateTotal()
  },[])


  return (
    <div className="cart-container">

      <div className="my-bag">
        <h4>My Tickets</h4>
        {
          examples.map((example) => {
            return(
              <div className="cart-item">
                <img src={example.url} alt={example.event} style={{width: '10vw', height: '10vh', marginRight: '1rem'}}/>
                <div className="item-details">
                  <p className="item-details">${example.price}</p>
                  <p className="item-details">{example.event}, {example.venue}</p>
                  <p className="item-details">{example.date}</p>
                  <p className="item-details">Quantity: {example.quantity}</p>
                </div>
              </div>
            )
          })
        }
        <NavLink to="/" className="menu-item">continue shopping</NavLink>
      </div>


      <div className="total">
        <h4>ORDER SUMMARY</h4>
        <div className="total-form">

          <h5 style={{justifyContent: 'space-between'}}>subtotal ${total}</h5>
          <h5>fees NONE</h5>
          <h5>ORDER TOTAL ${total}</h5>
          
        </div>
        <p style={{fontSize: '1.2vh'}}>Do you have a promo code?</p>
        <input type="text" className="discount" id="discount-input"/><button className='discount' id="discount-button">Apply</button>
        {/* need to create handlesubmit function to redirect to checkout component for stripe */}
        <button id="checkout-button">PROCEED TO CHECKOUT</button>
      </div>

    </div>
  )
}
