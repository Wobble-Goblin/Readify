import React, { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";

function BookEntryCard() {
  const [cardState, setCardState] = useState({
    bookName: '',
    playlistId: ''
  })

  useEffect(() => {
    //console.log(bookName);
  })

  const handleClick = e => {
    fetch('/api/get-title', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: cardState.bookName,
      })
    })
    .then(data => data.json())
    .then(data => {
      console.log(data.playlistId);
      setCardState({...cardState, playlistId: data.playlistId})
    });
  }

  const handleOnChange = e => {
    setCardState({...cardState, bookName: e.target.value});
  }

  return (
    <div className='bookEntry'>
    <input type="text" placeholder="Enter Book Title" onChange={handleOnChange}></input>
    <button onClick={handleClick}>Send</button>
      <PlayerCard playlistId={cardState.playlistId} />
    </div>
  )
}

export default BookEntryCard;