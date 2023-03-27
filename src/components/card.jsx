export default function Card({ card, handleChoice, flipped, inactive }) {

const handleClick = () => {
  if (!inactive) {
    handleChoice(card)
  }
}

  return (
    <div className='card'>
      <div className={flipped ? "flipped" : ""}>
        <img className='front-card' src={card.src} alt='card front'/>
        <img
          onClick={handleClick}
          className='back-card'
          src='/img/dino.png'
          alt='card back'/>
      </div>
    </div>
  )
}