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
    fetch('/api/get-playlist', {
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
    <div className='bookEntry' class=' m-10 '>
    <input class='text-slate-900 pl-10 w-10/12 h-10 my-10 rounded-sm' type="text" placeholder="Enter Book Title" onChange={handleOnChange}></input>
    <button class='h-10 bg-primary text-black w-2/12 rounded-sm' onClick={handleClick}>Send</button>
    <PlayerCard playlistId={cardState.playlistId} />
    </div>
  )
}

export default BookEntryCard;