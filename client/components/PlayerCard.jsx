import React, { useState } from "react";


function PlayerCard(props) {
  return (
    <div>
    <iframe style={{"border-radius": '12px'}} src={`https://open.spotify.com/embed/playlist/${props.playlistId}?utm_source=generator`} width="100%" height="380" frameBorder="0" allowFullScreen="" /*allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"*/></iframe>

    </div>
  )
}

export default PlayerCard;