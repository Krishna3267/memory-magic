import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

const cardImages = [
  {"src" : "/img/diamond.png", matched: false},
  {"src" : "/img/hat.png", matched: false},
  {"src" : "/img/joker.png", matched: false},
  {"src" : "/img/pen.png", matched: false},
  {"src" : "/img/sword.png", matched: false},
  {"src" : "/img/wand.png", matched: false}
] 

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);


  //access the selected choices
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [disabled, setDisabled] = useState(false);

  //duplicate each card once
  //randomize the order of cards in array using sort method
  //give a random id to each card and use the id to output it

  const shuffleCards = () => {


    const shuffledCards = [...cardImages, ...cardImages].sort(
      () => Math.random() - 0.5
      ).map(
        (card) => ({...card, id: Math.random()})
      )
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0);
      // console.log("new game pressed");
  }

// console.log(cards, turns);

//to setchoice one and two // take it a link between Card.js and App.js
const handleChoice = (card) => {
  // console.log(card);
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

}


// useEffect(() => {
  
//   const fireWhenTwoChanges = () => {
//     console.log("yea two changed")
//     if(choiceOne.src === choiceTwo.src){
//       console.log("yes");
//     }else{
//       console.log("no");
//     }
    
  
//   }

//   if(choiceTwo){
//     fireWhenTwoChanges();
//     resetTurn();
//   }
    

// }, [choiceTwo]);

useEffect(() => {
  
  if(choiceOne && choiceTwo){
    setDisabled(true)
    if(choiceOne.src === choiceTwo.src){
      // console.log("yeah");
      setCards( prevCards => {
        return prevCards.map(card => {
          if(card.src === choiceOne.src){
            return {...card, matched: true}
          }else{
            return card
          }
        })
      })
      resetTurn()
    }
    else{
      // console.log("No")
      setTimeout(() => {
        resetTurn()
      }, 1000);

    }
  }
}, [choiceOne, choiceTwo]);

// console.log(cards);  

const resetTurn = () => {
  setDisabled(false)
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
}

useEffect(() => {
  shuffleCards()
  document.title="Memory Magic"
}, []);


  return (
    <div className="App">
      <nav className='navbar'>
      <h2>Memory Magic</h2>
      <button onClick={shuffleCards}>New Game</button>
      </nav>
      
      <div className="card-grid">
        {cards.map(card => (
          <Card 
            handleChoice={handleChoice}
            key={card.id} 
            card={card}
            flipped = {card === choiceOne || card=== choiceTwo || card.matched}
            disabled={disabled} />
        ))}
      </div>
      <div className="turns" style={{marginTop:"10px"}}>Turns : {turns}</div>
    </div>
  );
}

export default App;
