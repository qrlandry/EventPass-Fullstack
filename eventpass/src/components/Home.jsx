import Nav from "./Nav";
import SearchBar from "./SearchBar";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

export default function Home({ evts }) {
  let navigate = useNavigate();

  const showEvent = (id) => {
    navigate(`event/details/${id}`);
  };

  return (
    <div className="home">
      <Nav evts={evts}/>
      {/* <SearchBar evts={evts}/> */}
      <div className="headliners-container">
        <h2 className="home-display" style={{marginBottom: '2vh', alignItems: 'center'}}>Headliners of the Week</h2>
        {evts ? (
          <div className="headliners">
            <div className="headliner-item">
              <img
                src={evts[9]["photo_url"]}
                alt="odesza"
                className="headliner-image"
                key={evts[9].id}
              />
              <div className="headliner-info">
                <h3 style={{margin: '0'}}>{evts[9].name}</h3>
                <button onClick={() => showEvent(evts[9].id)} className="ticket-button">See Tickets</button>
              </div>
            </div>
            <div className="headliner-item">
              <img
                src={evts[10]["photo_url"]}
                alt="acdc"
                className="headliner-image"
                key={evts[10].id}
              />
              <div className="headliner-info">
                <h3 style={{margin: '0'}}>{evts[10].name}</h3>
              <button onClick={() => showEvent(evts[10].id)} className="ticket-button">See Tickets</button>
              </div>
            </div>
            <div className="headliner-item">
              <img
                src={evts[11]["photo_url"]}
                alt="acdc"
                className="headliner-image"
                key={evts[11].id}
              />
              <div className="headliner-info">
                <h3 style={{margin: '0'}}>{evts[11].name}</h3>
              <button onClick={() => showEvent(evts[11].id)} className="ticket-button">See Tickets</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      


      <div className="upcoming-shows-container">
        <h2 className="home-display" style={{marginTop: '0',  marginBottom: '2vh'}}>All Concerts</h2>
        <div className="upcoming-container">
          {evts?.map((evt, index) => {
            if (
              evt["category"] === "music" &&
              (evt["name"] != "Odesza")
            ) {
              return (
                <div className="music" key={index}>
                  <img
                    src={evt["photo_url"]}
                    alt={evt["name"]}
                    style={{ maxHeight: "200px" }}
                    onClick={() => showEvent(evt.id)}
                    className="home-image"
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>

      <div className="comedy-container">
        <h2 className="home-display" style={{marginTop: '5vh', marginBottom: '0'}}>Comedy</h2>
        <div className="comedy">
          {
            evts?.map((evt, index) => {
              if (
                evt["category"] === "comedy"
              ) {
                return (
                  <div className="comedy-item" key={index}>
                    <img
                      src={evt["photo_url"]}
                      alt={evt["name"]}
                      style={{ width: "100%", marginTop: "2vh", border: '0.2px solid gray' }}
                      onClick={() => showEvent(evt.id)}
                      className="home-image"
                    />
                    <h5 style={{margin: '0'}}>{evt['name']}</h5>
                  </div>
                );
              } else {
                return null;
              }
              
            })
          }
        </div>
      </div>

      <div className="sports-container">
        <h2 className="home-display" style={{marginTop: '5vh',  marginBottom: '2vh'}}>Sports</h2>
        <div className="sports">
          {evts?.map((evt, index) => {
            if (evt["category"] === "sports") {
              return (
                <div className="sport" key={index}>
                  <img
                    src={evt["photo_url"]}
                    alt={evt["name"]}
                    style={{ maxHeight: "200px" }}
                    onClick={() => showEvent(evt.id)}
                    className="home-image"
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>

      <div className="soldout-container">
        <h2 className="home-display" style={{marginTop: '5vh'}}>Sold Out</h2>
        {evts ? (
          <img
            src={evts[25]["photo_url"]}
            alt="coachella"
            style={{ width: "100%", marginBottom: '100px', marginTop: '2vh' }}
            className="home-image"
            onClick={() => showEvent(evts[25].id)}
          />
        ) : null}
      </div>
    </div>
  );
}
