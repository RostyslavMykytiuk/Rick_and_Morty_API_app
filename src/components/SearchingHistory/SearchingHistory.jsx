import React, { useEffect, useState } from 'react'
import './SearchingHistory.scss'

const SearchingHistory = (props) => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    // Setting searching history from localstorage
    setHistory(JSON.parse(localStorage.getItem('recentSearches')))
  },[])

  return (
    <div className='searching_history_container'>
        {
            history.map((item,index) => {
                return (
                    <div key={index} className="searching_history_item" onClick={() => props.callback(item)}>
                            {item}
                    </div>
                )
            })
        }
    </div>
  )
}

export default SearchingHistory