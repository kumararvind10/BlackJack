const db = require('./db');

let methods = {};

//class for individual card
class Card {
    constructor(suit, value, cardVal) {
        this.suit = suit;
        this.value = value;
        this.cardVal = cardVal;
    }
}

//class for creating deck.
class Deck {
    constructor() {
        this.deck = [];
        this.count = 0;

    }

    createDeck(suits, values) {
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < values.length; j++) {
                this.deck.push(new Card(suits[i], values[j], j + 1));

                if (j > 9) {
                    this.deck[this.count].cardVal = 10;
                }

                if (j === 0) {
                    this.deck[this.count].cardVal = 11;
                }

                this.count++;
            }
        }

        return this.deck;
    }


}

const deal = async (decks) => {

    let player = [],
        dealer = [];

    for (let i = 0; i < 2; i++) {
        player[i] = decks.shift();
        dealer[i] = decks.shift();
    }
    return {
        deck: decks,
        dealerHand: dealer,
        playerHand: player
    };
};

const shuffled = async (deck) => {
    let counter = deck.length,
        temp,
        i;

    while (counter) {
        i = Math.floor(Math.random() * counter--);
        temp = deck[counter];
        deck[counter] = deck[i];
        deck[i] = temp;
    }
    return deck;
};


methods.init = async (deck_count) => {
    let suits,
        values,
        decks = [];

    suits = ["spades", "diamonds", "clubs", "hearts"];
    values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    for (let i = 0; i < deck_count; i++) {
        let deck = new Deck();
        decks.push(deck.createDeck(suits, values));
    }

    let res = decks.concat.apply([], decks);
    console.log(res.length);
    let shuffledRes = await shuffled(res);
    let dealRes = await deal(shuffledRes);

    return dealRes;

};

module.exports = methods;


