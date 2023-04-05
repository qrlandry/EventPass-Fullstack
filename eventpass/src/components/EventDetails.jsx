import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { CartContext } from "../CartContext";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/EventDetails.css';

export default function EventDetails({ evts, tickets, venues }) {
  const [evt, setEvent] = useState(null);
  const [ ticket, setTickets ] = useState(null);
  const [ venue, setVenue ] = useState(null);
  const [ numTicketsReserved, setNumTicketsReserved ] = useState(0);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { loggedIn } = useContext(UserContext) 

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const getSelectedEvent = async () => {
      if (evts && evts.length > 0) {
        //get event detail
        let selectedEvent = evts.find(
          (thisEvent) => thisEvent.id === parseInt(id)
        );
        //get ticket detail
        let selectedTicket = tickets.find(
          (thisTicket) => thisTicket.id === parseInt(id)
        );
        console.log('THIS EVENT IS', selectedEvent);
        setEvent(selectedEvent);
        console.log('THIS TICKET IS', selectedTicket)
        setTickets(selectedTicket);
      }
    };
    getSelectedEvent();
  }, [id, evts]);

  const increaseTickets = () => {
    console.log("clicked one more")
    if (numTicketsReserved<3 && numTicketsReserved < (ticket.number_of_tickets - ticket.tickets_sold)){
      let reserved = numTicketsReserved + 1
      setNumTicketsReserved(reserved)
    } else {
      console.log("max num of tickets reserved")
    }
  }

  const decreaseTickets = () => {
    console.log("clicked one less")
    if (numTicketsReserved > 0) {
      let reserved = numTicketsReserved - 1
      setNumTicketsReserved(reserved)
    }
  }

  const addToCart = () => {
    console.log("adding to cart")
    setCartItems(cartItems => [...cartItems,{
      event: evt.name,
      photo_url: evt.photo_url,
      date: evt.datetime,
      numTickets: numTicketsReserved,
      pricePerTicket: ticket.price,
      total: (numTicketsReserved * ticket.price).toFixed(2)
    }])
    loggedIn ? navigate('/cart') : navigate('/signin')
  }

  return evt ? (
    <div className="detail">
      <div className="detail-header">
        {/* <h2>{evt.name}</h2> */}
        <img src={evt.photo_url} alt={evt.name} style={{height: '50%', width: '50%'}}/>
        
        
        
      </div>
      <div className="event-tickets">
        {
          ticket.number_of_tickets == ticket.tickets_sold ? 
          <div className="ticket-soldout">
            <h4>SOLD OUT</h4>
          </div> : 
          <div className="ticket-info">
            <h4>{evt.name}</h4>
            <h4>Price: ${ticket.price}</h4>
            <h4>Seating: {ticket.seating}</h4>
            <h4>Due to selfish people we only allow a maximum three tickets per customer.</h4>
            <h4>Tickets remaining: {ticket.number_of_tickets - ticket.tickets_sold}</h4>
            <div className="ticket-count">
              <h4>Tickets: {numTicketsReserved}</h4>
              <h3 onClick={increaseTickets} style={{marginRight: '5px', marginLeft: '25px'}} className="plus-minus">+</h3><h3 onClick={decreaseTickets} className="plus-minus">-</h3>
            </div>
            <div className="bottom-right">
              <h4>Total: {(numTicketsReserved * ticket.price).toFixed(2)}</h4>
              <button onClick={addToCart} className="add-to-cart">Add to Cart</button>
              <NavLink to="/" className="back-arrow" style={{color: 'black', display: 'block'}}>← back</NavLink>
            </div>
          </div>
        }
      </div>

    </div>
  ) : (
    <h3>No event found</h3>
  );
}
