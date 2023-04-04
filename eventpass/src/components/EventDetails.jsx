import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../services/api";
import axios from "axios";

export default function EventDetails(){

  let {id} = useParams()
  const [allEvents, setAllEvents] = useState(null)
  const [event, setEvent] = useState(null);
  const [eventId, setEventId] = useState(null);

  useEffect(() => {  
    const getEvents = async () => {
      const response = await axios.get(`${BASE_URL}/events`);
      console.log("EVENTS:", response.data);
      setAllEvents(response.data);
    };
    getEvents();
  }, []);

  useEffect(() => {
    let selectedEvent = allEvents.find((event) => event.id === parseInt(id))
    console.log("SELECTED EVENT", selectedEvent)
    setEvent(selectedEvent)

    setEventId(selectedEvent.id)
  },[allEvents,id])
  
  return event? (
    <div className="detail">
      <div className="detail-header">
        <h2>{event.name}</h2>
        <img src={event.photo_url} alt={event.name} />
      </div>
    </div>
  ) : <h3>No event found</h3>

}
