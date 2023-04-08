import React from 'react'
import UserHistoryItem from '../UserHistoryItem';

function UserHistoryContainer(){

    const [history, setHistory] = React.useState({
        // this will change depending on what we actually take in, can also restruture the objects
        historyItems: 
        [
            {bookTitle: 'Das\'s Animals Gang', author: 'Matteo D.', isInstrumental: 'Instrumental Only', playlistLength: '4+ Hours'}, 
            {bookTitle: 'Dylan is a RegEx Master',  author: 'Jasmine N.', isInstrumental: 'All', playlistLength: '< 1 Hour'}
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
        <div className='UserHistoryContainer'>{historyItemArray}</div>
    )
}

export default UserHistoryContainer;