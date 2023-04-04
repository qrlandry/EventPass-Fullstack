import Nav from "./Nav";
import SearchBar from "./SearchBar";
import "../styles/Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../services/api";

export default function Home() {
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
              src={events[8]["photo_url"]}
              alt="edc"
              className="home-image"
            />
          </div>
          <div className="headliners-container">
            <img
              src={events[21]["photo_url"]}
              alt="odesza"
              className="home-image"
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

// <div className="third">
// <div className="featured-event">
//   <img src="https://acrisurearena.com/wp-content/uploads/2023/03/Static_Digital-Ticketmaster_1920Wx1080H_ODESZA_2023_Regional_AcrisureArena_0920.jpeg" alt="odesza" className="featured-image" style={{width: '100%'}}/>
//   <div className="details">
//     <div className="details-1">
//       <h3 style={{margin: '0', marginRight: '1vw'}}>Odesza</h3>
//       <h5 style={{margin: '0'}}>The Last Goodbye Tour 2023</h5>
//     </div>
//     <button className="tickets">Tickets</button>
//   </div>

// </div>
// <div className="featured-event-side">
//   <div className="featured-event-2">
//     <img src="https://media.pitchfork.com/photos/633aed2d11e16738d909b698/master/w_1280%2Cc_limit/Arctic-Monkeys-Tour.jpg" alt="arctic monkeys" className="featured-event-2" style={{width: '13vw'}}/>
//     <h3 style={{margin: '0'}}>Artic Monkeys</h3>
//     <button className="tickets-2">See Tickets</button>
//   </div>
//   <div className="featured-event-2">
//     <img src="https://variety.com/wp-content/uploads/2022/11/Screen-Shot-2022-11-01-at-5.07.37-AM.png?w=1024" alt="taylor swift" className="featured-event-2"  style={{width: '13vw'}}/>
//     <h3 style={{margin: '0'}}>Taylor Swift</h3>
//     <button className="tickets-2">See Tickets</button>
//   </div>
//   <div className="featured-event-2">
//     <img src="https://media.pitchfork.com/photos/633aed2d11e16738d909b698/master/w_1280%2Cc_limit/Arctic-Monkeys-Tour.jpg" alt="arctic monkeys" className="featured-event-2" style={{width: '13vw'}}/>
//     <h3 style={{margin: '0'}}>Artic Monkeys</h3>
//     <button className="tickets-2">See Tickets</button>
//   </div>
//   <div className="featured-event-2">
//     <img src="https://variety.com/wp-content/uploads/2022/11/Screen-Shot-2022-11-01-at-5.07.37-AM.png?w=1024" alt="taylor swift" className="featured-event-2"  style={{width: '13vw'}}/>
//     <h3 style={{margin: '0'}}>Taylor Swift</h3>
//     <button className="tickets-2">See Tickets</button>
//   </div>
// </div>

// </div>
// <h2 className="home-display" style={{marginTop: '0'}}>Nearly Sold Out</h2>
// <div className="third" id="middle">

// <div className="tonight-item">
//   <img src="https://koreajoongangdaily.joins.com/data/photo/2023/01/09/a42a47d0-6e6a-4605-9464-717e2c121bfd.jpg" alt="blackpink" className="tonight-image" />
// </div>

// <div className="tonight-item">
//   <img src="https://static.clubs.nfl.com/image/private/f_auto/bears/pinyquofshcjrbbhjwz2" alt="blackpink" className="tonight-image" />
// </div>

// <div className="tonight-item">
//   <img src="https://www.cultr.com/wp-content/uploads/2022/10/Blink.jpg" alt="blackpink" className="tonight-image" />
// </div>

// <div className="tonight-item">
//   <img src="https://i.ebayimg.com/images/g/5DgAAOSwFRxeXUM5/s-l1600.jpg" alt="blackpink" className="tonight-image" />
// </div>

// <div className="tonight-item">
//   <img src="https://pbs.twimg.com/media/FjUnt4xXEB0gntT?format=jpg&name=large" alt="blackpink" className="tonight-image" />
// </div>

// <div className="tonight-item">
//   <img src="https://www.summitathletics.com/assets/img/our-work/portfolio/graphic-design/2021-UNH-FB-Poster.jpg" alt="blackpink" className="tonight-image" />
// </div>

// <div className="tonight-item">
//   <img src="https://media.pitchfork.com/photos/6384e30dc121519c514b9943/master/w_1280%2Cc_limit/The-Weeknd-2023-Tour.jpg" alt="blackpink" className="tonight-image" />
// </div>

// <div className="tonight-item">
//   <img src="https://pbs.twimg.com/media/FjUnt4xXEB0gntT?format=jpg&name=large" alt="blackpink" className="tonight-image" />
// </div>

// <div className="tonight-item">
//   <img src="https://www.summitathletics.com/assets/img/our-work/portfolio/graphic-design/2021-UNH-FB-Poster.jpg" alt="blackpink" className="tonight-image" />
// </div>

// <div className="tonight-item">
//   <img src="https://media.pitchfork.com/photos/6384e30dc121519c514b9943/master/w_1280%2Cc_limit/The-Weeknd-2023-Tour.jpg" alt="blackpink" className="tonight-image" />
// </div>

// </div>

// <h2 className="home-display">Comedy</h2>
// <div className="third" id='bottom'>
// <div className="bottom-items">

//   <div className="bottom-item">
//     <img src="https://pbs.twimg.com/media/C5bAlDLWcAAOqnC.jpg" alt="ricky gervais" className="bottom-image" />
//   </div>

//   <div className="bottom-item">
//     <img src="https://m.media-amazon.com/images/M/MV5BNzlmMmFkZTMtZDg3Zi00ZjJmLWJiNzEtZTk0ZWJiZjVkMmRjXkEyXkFqcGdeQXVyMTMzNzIyNDc1._V1_.jpg" alt="chris rock" className="bottom-image" />
//   </div>

//   <div className="bottom-item">
//     <img src="https://www.propeller.la/cdn-cgi/image/fit=scale-down,width=1000,format=auto,quality=40/files/taylor_tomlinson-propeller-poster-v2_19660.jpg" alt="taylor tomlinson" className="bottom-image" />
//   </div>

//   <div className="bottom-item">
//     <img src="http://www.maconcentreplex.org/wp-content/uploads/2022/11/RC2023_Macon_Website-Featured_426x640.jpg" alt="royal comedy" className="bottom-image" />
//   </div>

//   <div className="bottom-item">
//     <img src="https://images.discovery-prod.axs.com/2023/02/uploadedimage_63fccfdf632fd.jpg" alt="kevin hart" className="bottom-image" />
//   </div>

//   <div className="bottom-item">
//     <img src="https://m.media-amazon.com/images/M/MV5BNzlmMmFkZTMtZDg3Zi00ZjJmLWJiNzEtZTk0ZWJiZjVkMmRjXkEyXkFqcGdeQXVyMTMzNzIyNDc1._V1_.jpg" alt="chris rock" className="bottom-image" />
//   </div>

//   <div className="bottom-item">
//     <img src="https://www.propeller.la/cdn-cgi/image/fit=scale-down,width=1000,format=auto,quality=40/files/taylor_tomlinson-propeller-poster-v2_19660.jpg" alt="taylor tomlinson" className="bottom-image" />
//   </div>

// </div>

// </div>
// <h2 className="home-display" style={{textAlign: 'center', marginBottom: '1vh', marginTop: '0'}}>Coming Soon</h2>
// <img src="https://i.ytimg.com/vi/cJAObWRmWvM/maxresdefault.jpg" alt="" style={{width: '80vw', marginBottom: '100px'}}/>
