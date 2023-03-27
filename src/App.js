import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card';

const cardImages = [
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/1.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/2.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/3.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/4.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/5.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/6.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/7.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/8.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/9.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/10.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/11.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/12.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/13.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/14.png", matched: false},
  {"src": "https://qkyymgacogibwsilrvrp.supabase.co/storage/v1/object/public/game-images/15.png", matched: false},
];

function App() {

  const [cards, setCards] = useState([]);
  const [guesses, setGuesses] = useState(0);
  const [guessOne, setGuessOne] = useState(null);
  const [guessTwo, setGuessTwo] = useState(null);
  const [inactive, setInactive] = useState(false);

  const randomisedImageArray = (num) => {
    const cardsToPlay = cardImages
      .sort(() => Math.random() - 0.5)
      .slice(0, num)
    const shuffledCards = [...cardsToPlay, ...cardsToPlay]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
      setGuessOne(null)
      setGuessTwo(null)
      setCards(shuffledCards)
      setGuesses(0)
  };

  const handleChoice = (card) => {
    guessOne ? setGuessTwo(card) : setGuessOne(card)
  }

  useEffect(() => {
    if (guessOne && guessTwo) {
      setInactive(true)
      if (guessOne.src === guessTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === guessOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        reset()
      } else {
        setTimeout(() => reset(), 1000)
      }
    }
  }, [guessOne, guessTwo]);

  console.log(cards)

  const reset = () => {
    setGuessOne(null)
    setGuessTwo(null)
    setGuesses(prevGuesses => prevGuesses + 1)
    setInactive(false)
  }

  useEffect(() => {
    randomisedImageArray(4)
  }, [])

  return (
    <div className="App">
      <h1>Snappy Testing</h1>
      <div className='card-grid'>
        {cards.map(card => (
          <Card
            handleChoice={handleChoice}
            key={card.id}
            card={card}
            flipped={card === guessOne || card === guessTwo || card.matched}
            inactive={inactive}
          />
        ))}
      </div>
      <p> Guesses: {guesses}</p>
    </div>
  );
};

export default App;
