import React, { useState } from "react";

function PlayerCard() {

  console.log('hello');
  const [whatToPlay, setPlaylist] = useState([]);

  // const playlist = async () => {
  //   await
  fetch('/get-playlist')
    .then(data => data.json())
    .then(data => {
      console.log(data);
      setPlaylist(data);
    });
// }

  //we need to change playlist on src according to search
  const url = `https://open.spotify.com/embed/playlist/${whatToPlay[0]}?utm_source=generator` 

  return (
    <div>
       <iframe style={{"border-radius": '12px'}} src="https://open.spotify.com/embed/playlist/0XcS2CAmkEndWbHoAgHXDO?utm_source=generator" width="100%" height="380" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
      {/* <iframe style={{"border-radius": '12px'}} src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO4yZWY4?utm_source=generator" width="100%" height="380" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe> */}
    </div>
  )
}

export default PlayerCard;