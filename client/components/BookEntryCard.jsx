import React, { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";

function BookEntryCard() {
  const [bookName, setBookName] = useState('')

  useEffect(() => {
    //console.log(bookName);
  })

  const handleClick = e => {
    fetch('/api/get-playlist', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: bookName,
      })
    });
  }

  const handleOnChange = e => {
    setBookName(e.target.value);
  }

  return (
    <div className='bookEntry'>
    <input type="text" placeholder="Enter Book Title" onChange={handleOnChange}></input>
    <button onClick={handleClick}>Send</button>
    <PlayerCard />
    </div>
  )
}

export default BookEntryCard;