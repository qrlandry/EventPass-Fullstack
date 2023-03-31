//search bar
import '../styles/searchbar.css'
import SearchIcon from '@mui/icons-material/Search';



export default function SearchBar({placeholder, data}){


  return(
    <div className="search-container">
      <div className="search-input">
        <input type="text" className="searchbar" placeholder="Search thousands of memorable events"/>
        <div className="search-icon"><SearchIcon/></div>
      </div>
    </div>
  )
}
