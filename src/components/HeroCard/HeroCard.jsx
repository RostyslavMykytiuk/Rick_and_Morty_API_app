import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HeroCard.scss'

const HeroCard = (props) => {
  const navigate = useNavigate()
  const navigateToDetails = () => {
    navigate(`/${props.id}`)
  }
  return (
    <div className='hero_card' onClick={navigateToDetails}>
        <img className='hero_card_image' src={props.image} alt="" />
        <div className="hero_card_details">
          <h1 className='hero_card_name'>{props.name}</h1>
          <small className='hero_card_species'>{props.species}</small>
        </div>
    </div>
  )
}

export default HeroCard