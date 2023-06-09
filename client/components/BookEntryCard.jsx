import React, { useState } from "react";
import PlayerCard from "./PlayerCard";

function BookEntryCard() {
  const [cardState, setCardState] = useState({
    bookName: '',
    playlistId: '37i9dQZF1DWZwtERXCS82H', //can we have somethin as default to not have "page not"
    imgURL: ''
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
      setCardState({...cardState, playlistId: data.playlistId, imgURL: data.imageURL})
    });
  }

  const handleOnChange = e => {
    setCardState({...cardState, bookName: e.target.value});
  }

  return (
    <div className='bookEntry' class=' m-10 '>
    <input class='text-slate-900 pl-5 w-10/12 h-10 my-10 rounded-sm' type="text" placeholder="Enter Book Title" onChange={handleOnChange}></input>
    <button class='h-10 bg-primary text-black w-2/12 rounded-sm' onClick={handleClick}>Send</button>
    <PlayerCard playlistId={cardState.playlistId} imageURL={cardState.imgURL} />
    </div>
  )
}

export default BookEntryCard;