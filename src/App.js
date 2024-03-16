// import React from 'react';
// import Deck from './Deck';

// function App() {
//   return (
//     <div>
//       <Deck />
//     </div>
//   );
// }

// export default App;

// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Deck from './Deck';

const App = () => {
  const [deckId, setDeckId] = useState('');
  const [cardsRemaining, setCardsRemaining] = useState(0);

  useEffect(() => {
    const fetchDeck = async () => {
      const { data } = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      setDeckId(data.deck_id);
      setCardsRemaining(data.remaining);
    };
    fetchDeck();
  }, []);

  return (
    <div>
      <Deck deckId={ deckId } setCardsRemaining={ setCardsRemaining } cardsRemaining={ cardsRemaining } />
    </div>
  );
};

export default App;
