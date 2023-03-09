import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

import './HeroDetails.scss'

import BackButton from '../../assets/back.png'

const HeroDetails = () => {

  const {id} = useParams()

  const [hero,setHero] = useState({})
  const [origin, setOrigin] = useState('')

  const navigate = useNavigate()
  const getBack = () =>{
    navigate('/')
  }
  useEffect(()=>{
    const getHero = async() =>{
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        setHero(response.data)   
        setOrigin(response.data.origin.name)  
    }

    getHero()

  },[])
  return (
    <div className='hero_details_container' onClick={getBack}>
        <div className="hero_details_previous_button">
            <img src={BackButton} alt="" />
            <b>Go back</b>
        </div>
        <img src={hero.image} alt="" className='hero_details_image' />
        <h1 className='hero_details_name'>{hero.name}</h1>
        <h2 className='hero_details_title'>Informations</h2>
        <article className="hero_details">
            <b>Gender</b>
            <br></br>
            <small>{hero.gender}</small>
        </article>
        <article className="hero_details">
            <b>Status</b>
            <br></br>
            <small>{hero.status}</small>
        </article>
        <article className="hero_details">
            <b>Specie</b>
            <br></br>
            <small>{hero.species}</small>
        </article>
        <article className="hero_details">
            <b>Origin</b>
            <br></br>
            <small>{origin}</small>
        </article>
        <article className="hero_details">
            <b>Type</b>
            <br></br>
            <small>{hero.type || 'Unknown'}</small>
        </article>
    </div>
  )
}

export default HeroDetails