import React from 'react'

function UserHistoryItem(props){

    return(
        
        <div className = 'UserHistoryItem'> 
        <div className='bookDetails'>
            <div className = 'bookTitle'>Book Title: <span>{props.bookTitle}</span></div>
            <div className = 'author'>Book Title: <span>{props.author}</span></div>
        </div>
            <div className='userChoices'>
                <div className = 'isInstrumental'>Instrumental: <span>{props.isInstrumental}</span></div>
                <div className = 'playlistLength'>Book Title: <span>{props.playlistLength}</span></div>
                {/* <div className = 'bookTitle'>Book Title: <span>{props.bookTitle}</span></div>
                 <div className ='' > {props.isInstrumental}</div>  */}
            </div>
           


        </div>
    )
}

export default UserHistoryItem;