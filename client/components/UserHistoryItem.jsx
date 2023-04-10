import React from 'react'

function UserHistoryItem({ bookTitle, playlistId}){

    return(
        
        <div className = 'UserHistoryItem' class='flex flex-row justify-between my-10 py-5 px-10 border-2 border-solid border-primary rounded-lg'> 
        <div className='left' class='text-lg'>
            <div className = 'bookTitle'> <span class='font-bold mr-3'>Title: </span>{bookTitle}</div>
            {/* <div className = 'author'> <span  class='font-bold mr-3'>Author:</span>{props.author}</div> */}
        </div>
            <div className='right' class="flex flex-row items-baseline text-right">
                {/* <div className='userChoices'> */}
                 {/* <div className = 'isInstrumental'><span class='font-bold mr-3'>Instrumental: </span>{props.isInstrumental}</div>
                <div className = 'playlistLength'> <span class='font-bold mr-3'>Playlist Length:</span>{props.playlistLength}</div> */}
                {/* </div> */}
                <div className='playButton' class='self-center bg-primary ml-10 text-white rounded-md py-1 px-10'>PLAY ▷</div>
                {/* this button should bring back playlist */}


            </div>
           


        </div>
    )
}

export default UserHistoryItem;