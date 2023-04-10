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
    <div className='bookEntry' class=' m-10 '>
    <input class='text-slate-900 pl-10 w-10/12 h-10 my-10 rounded-sm' type="text" placeholder="Enter Book Title" onChange={handleOnChange}></input>
    <button class='h-10 bg-primary text-black w-2/12 rounded-sm' onClick={handleClick}>Send</button>
    <PlayerCard />
    </div>
  )
}

export default BookEntryCard;