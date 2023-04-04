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
      <Nav />
      <SearchBar />
      <h2 className="home-display">Headliners of the Week</h2>
      {evts ? (
        <div className="headliners">
          <div className="headliner-main-container">
            <img
              src={evts[9]["photo_url"]}
              alt="odesza"
              className="home-image"
              key={evts[9].id}
              onClick={() => showEvent(evts[8].id)}
              // style={{height: '200px'}}
            />
          </div>
          <div className="headliners-container">
            <img
              src={evts[33]["photo_url"]}
              alt="arctic monkeys"
              className="home-image"
              key={evts[21].id}
              onClick={() => showEvent(evts[32].id)}
            />
          </div>
        </div>
      ) : null}

      <h2 className="home-display">Sports Tonight</h2>
      <div className="sports-container">
        {evts?.map((evt, index) => {
          if (evt["category"] === "sports") {
            return (
              <div className="sport" key={index}>
                <img
                  src={evt["photo_url"]}
                  alt={evt["name"]}
                  style={{ maxHeight: "200px" }}
                  onClick={() => showEvent(evt.id - 1)}
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
        {evts?.map((evt, index) => {
          if (
            evt["category"] === "music" &&
            (evt["name"] != "Odesza" ||
              evt["name"] != "Arctic Monkeys" ||
              evt["name"] != "Coachella")
          ) {
            return (
              <div className="music" key={index}>
                <img
                  src={evt["photo_url"]}
                  alt={evt["name"]}
                  style={{ maxHeight: "200px" }}
                  onClick={() => showEvent(evt.id - 1)}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>

      <h2 className="home-display">Sold Out</h2>
      {evts ? (
        <img
          src={evts[25]["photo_url"]}
          alt="coachella"
          style={{ width: "60%" }}
          className="home-image"
          onClick={() => showEvent(evts[24].id)}
        />
      ) : null}
    </div>
  );
}
