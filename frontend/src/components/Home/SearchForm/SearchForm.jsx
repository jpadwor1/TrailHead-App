import './SearchForm.css';
import React from 'react';
import SearchIcon from '../../../assets/images/searchIcon.svg';
import  useSearch from '../../../hooks/useSearch';


function SearchForm() {
 const [search, setSearch] = React.useState("");
 const [isLoading, setIsLoading] = React.useState(false);

 const { findTrails } = useSearch();

 function handleChange(event) {
     setSearch(event.target.value);
 }

 function handleSubmit(event) {
    event.preventDefault();
    findTrails(search);
    setIsLoading(true);
 }
 
  return (
    <div className='home-search-container'>
        <form className="search-form" action="/trails/search" onSubmit={handleSubmit} >
            <img className="search-icon" src={SearchIcon} alt="Search Icon" />
            <input 
            type="text" 
            name="searchBar" 
            className="search-bar" 
            placeholder="Search by city, park, or trail name"
            onChange={handleChange}/>
            <button className="search-btn" type="submit"></button>
        </form>
    </div>
  )
}

export default SearchForm
