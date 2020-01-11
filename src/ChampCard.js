import React from 'react'
import heart from './imgs/heart.svg'
import heartSelected from './imgs/heartSelected.svg'

const ChampCard = ({name, amIBad, champId, image}) => {
  return (
    <article className='container' onClick={() => amIBad(champId, name)}>
    <h4>{name}</h4>
    <img className='champ image' src={image} alt='champ'/>
    <div className="middle">
      <div className="text">
      Am I Bad?
      <img src={heart} className='favorite' alt="favorite"/>
      </div>
    </div>
    </article>
  )
}

export default ChampCard
