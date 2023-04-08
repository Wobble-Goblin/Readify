import React, { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";

function BookEntryCard() {
  const [bookName, setBookName] = useState('')

  useEffect(() => {
    ;
  })

  const handleClick = e => {
    console.log(bookName);
  }

  const handleOnChange = e => {
    setBookName(e.target.value);
  }

  return (
    <div>
    <input type="text" placeholder="Enter Book Title" onChange={handleOnChange}></input>
    <button onClick={handleClick}>Send</button>
    <PlayerCard />
    </div>
  )
}

export default BookEntryCard;