import React from 'react'
import UserHistoryItem from '../components/UserHistoryItem';

function UserHistoryContainer(){

    const [history, setHistory] = React.useState({
        // this will change depending on what we actually take in, can also restruture the objects
        historyItems: 
        [
            {bookTitle: 'Das\'s Animals Gang', author: 'Matteo D.', isInstrumental: 'Instrumental Only', playlistLength: '4+ Hours'}, 
            {bookTitle: 'Dylan is a RegEx Master',  author: 'Jasmine N.', isInstrumental: 'All', playlistLength: '< 1 Hour'},
            {bookTitle: 'Book3',  author: 'author three', isInstrumental: 'Instrumental Only', playlistLength: '< 1 Hour'},
            {bookTitle: 'Book4',  author: 'Author four', isInstrumental: 'All', playlistLength: '2-4 hours'}
        ]
    })

    // console.log(history.historyItems)
    const historyItemArray = []
    history.historyItems.forEach((x,i)=>{
        historyItemArray.push(
            <UserHistoryItem 
                bookTitle={x.bookTitle}
                author={x.author}
                isInstrumental={x.isInstrumental}
                playlistLength={x.playlistLength}
                key={`history-item-${i}`}>
            </UserHistoryItem>
        )
    })

    return(
        <div className='UserHistoryContainer'>
            <h2 class='mt-20 mb-2 text-center text-3xl'>Previous Playlists</h2>    
            {historyItemArray}
        </div>
    )
}

export default UserHistoryContainer;