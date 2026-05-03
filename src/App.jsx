import { useEffect, useState } from "react";
import { Card } from "./Components/Card.jsx";
import { GameHeader } from "./Components/GameHeader.jsx";
import { WindMessage } from "./Components/WindMessage.jsx";

const CardValues = [
  "🐵","🦁","🦊","🦓","🐼","🐨","🐯","🐸",
  "🦁","🦓","🐵","🐼","🦊","🐸","🐨","🐯",
];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const initializeGame = () => {
    const shuffledValues = shuffleArray([...CardValues]);
    const finalCards = shuffledValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(finalCards)
    setMoves(0)
    setScore(0)
    setFlippedCards([]) ;
    setIsLocked(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2) return;

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsLocked(true);
      const firstCard = newCards.find(c => c.id === newFlippedCards[0]);
      const secondCard = newCards.find(c => c.id === newFlippedCards[1]);
if (firstCard.value === secondCard.value) {
  setScore((prev) => prev + 1);
  setTimeout(() => {
    setCards((prev) =>
      prev.map((c) =>
        newFlippedCards.includes(c.id)
          ? { ...c, isMatched: true, isFlipped: true }
          : c
      )
    );
    setFlippedCards([]);
    setIsLocked(false);
  }, 1000); 
}
       else {
        setTimeout(() => {
          const flippedBackCards = newCards.map((c) =>
            newFlippedCards.includes(c.id)
              ? { ...c, isFlipped: false }
              : c
          );

          setCards(flippedBackCards);
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }

      setMoves((prev) => prev + 1);
    }
  };
const hasWon = score === CardValues.length / 2;
  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onRestart={initializeGame} />
      {hasWon && <WindMessage moves={moves} />} 
      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;