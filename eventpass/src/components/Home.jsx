import Nav from "./Nav";
import SearchBar from "./SearchBar";
import "../styles/Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../services/api";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom'

export default function Home() {
  let navigate = useNavigate()

  const showEvent = (event) => {
    navigate(`${event.id}`)
  }

  const [events, setEvents] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      const response = await axios.get(`${BASE_URL}/events`);
      console.log("EVENTS RETURNED:", response.data);
      setEvents(response.data);
    };
    getEvents();
  }, []);

  return (
    <div className="home">
      <Nav />
      <SearchBar />
      <h2 className="home-display">Headliners of the Week</h2>
      {events ? (
        <div className="headliners">
          <div className="headliner-main-container">
        
            <img
              src={events[9]["photo_url"]}
              alt="odesza"
              className="home-image"
              key={events[9].id}
              onClick={()=>showEvent(events[9])}
            />
    
          </div>
          <div className="headliners-container">
            <img
              src={events[21]["photo_url"]}
              alt="arctic monkeys"
              className="home-image"
              key={events[21].id}
              onClick={()=>showEvent(events[21])}
            />
          </div>
        </div>
      ) : null}


      <h2 className="home-display">Sports Tonight</h2>
      <div className="sports-container">
        {events?.map((event, index) => {
          if (event["category"] === "sports") {
            return (
              <div className="sport" key={index}>
                <img
                  src={event["photo_url"]}
                  alt={event["name"]}
                  style={{ maxHeight: "200px" }}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>


      <h2 className="home-display">Upcoming Shows</h2>
      <div className="upcoming-container">
      {
        events?.map((event, index) => {
          if(event["category"] === "music" && (event['name'] != 'Odesza' || event['name'] != 'Arctic Monkeys'|| event['name'] != 'Coachella')) {
            return (
              <div className="music" key={index}>
                <img 
                  src={event["photo_url"]} 
                  alt={event["name"]}
                  style={{maxHeight: "200px"}} />
              </div>
            )
          } else {
            return null;
          }
        })
      }
      </div>

      <h2 className="home-display">Sold Out</h2>
      {events ? (
        <img
          src={events[25]["photo_url"]}
          alt="coachella"
          style={{ width: "60%" }}
          className="home-image"
        />
      ) : null}
    </div>
  );
}
