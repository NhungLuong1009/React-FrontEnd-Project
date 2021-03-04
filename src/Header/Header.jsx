import React, { useState, useEffect } from 'react';
import './Header.css'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';



const Header = ({searchDefault, update, searchError}) => {

  const [search, setSearch] = useState(searchDefault);

  function handleChange(event) {    
    setSearch(event.target.value); 
  }

  function handleSubmit(event) {
    event.preventDefault();
    update(search);
  }

  return (
    <div className='header-wrapper'>

      <div>
        <h1>Reddits</h1>
      </div>

      <div className='search'>
        <form onSubmit={handleSubmit}>
        Topic: 
          <input type='text' 
                    value={search} 
                    onChange={handleChange} 
                    onFocus={() => setSearch('')}/>
        </form>
        <span className='search-error'>{searchError}</span>
      </div>

    </div>
  )
}

export default Header;