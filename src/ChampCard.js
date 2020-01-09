import React from 'react'

const ChampCard = ({name, amIBad, champId, image}) => {
  return (
    <article onClick={() => amIBad(champId)} className="champ">
    <h1>{name}</h1>
    <img src={image} alt='champ'/>
    </article>
  )
}

export default ChampCard
