import React from 'react'


const ChampCard = ({name, amIBad, champId, image, addChampToProps, heart}) => {
  return (
    <article className='container' onClick={() => amIBad(champId, name)}>
    <h4>{name}</h4>
    <img className='champ image' src={image} alt='champ'/>
    <div className="middle">
      <div className="text">
      Am I Bad?
      {addChampToProps && <img src={heart} onClick={() => addChampToProps(name, champId, image, heart)} className='favorite' alt="favorite"/>}
      {!addChampToProps && <img src={heart}  className='favorite' alt="favorite"/>}
      </div>
    </div>
    </article>
  )
}

export default ChampCard
