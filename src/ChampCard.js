import React from 'react'

const ChampCard = ({name, amIBad, champId, image}) => {
  return (
    <article className='container' onClick={() => amIBad(champId, name)}>
    <h4>{name}</h4>
    <img className='champ image' src={image} alt='champ'/>
    <div className="middle">
      <div className="text">Am I Bad?</div>
    </div>
    </article>
  )
}

export default ChampCard
