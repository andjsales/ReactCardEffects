import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

// Deck: uses deck API, allows drawing card at a time.
function Deck({ deckId, setCardsRemaining, cardsRemaining }) {
    const [currentCard, setCurrentCard] = useState(null);
    const [isShuffling, setIsShuffling] = useState(false);

    // drawCard: change the state & effect will kick in.
    async function drawCard() {
        if (cardsRemaining === 0) {
            alert('Error: no cards remaining!');
            return;
        }
        const { data } = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        setCurrentCard(data.cards[0]);
        setCardsRemaining(data.remaining);

    }

    // shuffleCards: change the state & effect will kick in
    async function shuffleCards() {
        setIsShuffling(true);
        await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
        setCurrentCard(null);
        setCardsRemaining(52);
        setIsShuffling(false);
    }

    return (
        <div>
            <button onClick={ drawCard } disabled={ cardsRemaining === 0 || isShuffling }>Draw Card</button>
            <button onClick={ shuffleCards } disabled={ isShuffling }>Shuffle Deck</button>
            { currentCard && <Card card={ currentCard } /> }
        </div>
    );
}


export default Deck;
