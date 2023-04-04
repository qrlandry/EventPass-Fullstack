import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventDetails({ evts }) {
  const [evt, setEvent] = useState(null);
  const [eventId, setEventId] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    const getSelectedEvent = async () => {
      if (evts && evts.length > 0) {
        let selectedEvent = evts.find(
          (thisEvent) => thisEvent.id === parseInt(id)
        );
        setEvent(selectedEvent);
      }
    };
    getSelectedEvent();
  }, [id, evts]);

  return evt ? (
    <div className="detail">
      <div className="detail-header">
        <h2>{evt.name}</h2>
        <img src={evt.photo_url} alt={evt.name} />
      </div>
    </div>
  ) : (
    <h3>No event found</h3>
  );
}
