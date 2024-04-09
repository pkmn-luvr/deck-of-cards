import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [deckId, setDeckId] = useState('');
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(response => response.json())
    .then(data => setDeckId(data.deck_id))
    .catch(error => console.error("Error fetching deck:", error));
  }, []);
      
  // Part 1 - Click to Draw. Every time the Draw A Card button is hit, displays a new card, until there are no cards left in the deck.
  const drawCard = () => {
    if(deckId) {
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(response => response.json())
      .then(data => {
        if(data.cards.length > 0) {
          setCurrentCard(data.cards[0]);
        }
        else {
          alert("Error: No cards remaining.");
        }
      });
    }
  };


  // Part 2 - Shuffle Deck - Shuffle button is not clickable while shuffle is in progress. Shuffle also removes cards from screen
  const [isShuffling, setIsShuffling] = useState(false);

  const shuffleDeck = () => {
    setIsShuffling(true); //Disables shuffle button while shuffle is in progress
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
    .then(response => response.json())
    .then(() => {
      setIsShuffling(false); //Re-enables shuffle button once shuffle is completed
      setCurrentCard(null); //Clears current card(s)
    });
  };

  return (
    <div className="App">
      <button 
        onClick={drawCard}>Draw a Card
      </button>

      <button
        onClick={shuffleDeck} disabled={isShuffling}>
          {isShuffling ? 'Shuffling Deck...' : 'Shuffle Deck'}
      </button>
      
      {currentCard && (
        <div>
          <img src={currentCard.image} alt={`${currentCard.value} of ${currentCard.suit}`} />
          </div>  
      )}
    </div>
  );
}

export default App;