import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './HeroesList.scss'
import CartoonIMG from '../../assets/main_img.png'

import HeroCard from '../HeroCard/HeroCard'
import SearchingHistory from '../SearchingHistory/SearchingHistory'

const HeroesList = () => {

  const [heroes, SetHeroes] = useState([])

  const [searchValue, setSearchValue] = useState('')
  // state for showing and hiding searching history
  const [toggleSearch, setToggleSearch] = useState('none')

  //adding searching data to localstorage and hiding searching items on blur
  const addSearchingValue = () =>{
    
    let data = JSON.parse(localStorage.getItem('recentSearches'))
    if(searchValue !== '' && !data.includes(searchValue)){
        data.push(searchValue)
        localStorage.setItem('recentSearches',JSON.stringify(data))
    }

    
  }
  // setting input value by clicking on search history item
  const setSearchingValue = (item) => {
    setSearchValue(item)
    setToggleSearch('none')
  }


  useEffect(()=>{
    //getting data
    const fetchHeroes = async () =>{
        try {
            const {data} = await axios.get(`https://rickandmortyapi.com/api/character/`)

            //sorting heroes by name
            const sortedHeroes = data.results.sort((a , b)=>{

                let fa = a.name.toLowerCase()
                let fb = b.name.toLowerCase()

                if(fa > fb){
                    return 1
                }
                if(fa < fb){
                    return -1
                }
                
                return 0
            })

            SetHeroes(sortedHeroes)
        } catch (error) {
            console.error(error.message)
        }
    }

    fetchHeroes()

    if(localStorage.getItem('recentSearches') === null){
        localStorage.setItem('recentSearches','[]')
    }

    

  },[])

  


  return (
    <div className='heroes_container'>  
        <div className="heroes_input_container">
            <img className='heroes_input_img' src={CartoonIMG} alt="" />
            <input 
                type="text" 
                autoComplete='off'
                name="heroes_input" 
                id="heroes_input" 
                className='heroes_input'
                placeholder='Filter by name...'
                onChange={event => setSearchValue(event.target.value)} 
                value={searchValue}
                onBlur={ addSearchingValue}
                onFocus={()=> setToggleSearch('block')}
            />
            <div className="searching_history" style={{display:toggleSearch}}>
                <SearchingHistory callback={setSearchingValue}/>
            </div>
            
        </div>
        <div className='heroes_list'>
            {
                heroes.filter((hero)=>{
                    if(searchValue === ''){
                        return hero
                    }
                    else{
                        return hero.name.toLowerCase().includes(searchValue.toLowerCase())
                    }
                }).map((hero,index)=>{
                    return (
                        <HeroCard
                            id={hero.id}
                            image={hero.image}
                            key={index}
                            name={hero.name}
                            species={hero.species}
                        />
                    )
                })
            }
        </div>
    </div>
  )
}

export default HeroesList