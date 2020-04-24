
const db = require('./db');
const score = require('./scoreCalculate');


let methods = {};

methods.dealerDeckDraw = async (deck_id) => {
    let cardDraw = false;
    let deckRes = await db.getDeck(deck_id);
    if (!deckRes) return { status: false, response: `deck not found for given id ${deck_id}` };

    let decks = deckRes.deck,
        player = deckRes.playerHand,
        dealer = deckRes.dealerHand;

    let playerScore = await score.scoreCal(player),
        dealerScore = await score.scoreCal(dealer);

    if (deckRes.playerStatus === 'bust') {
        deckRes.dealerStatus = 'win';
        deckRes.id = deck_id;
        return { status: true, response: deckRes };
    }

    while (dealerScore < 17) {
        dealer.push(decks.shift());
        dealerScore = await score.scoreCal(dealer);
        cardDraw = true;
    }

    if (dealerScore > 21 && playerScore < dealerScore) {
        deckRes.playerStatus = 'win';
    } else if (playerScore > dealerScore) {
        deckRes.playerStatus = 'win';
    } else if (dealerScore === playerScore) {
        deckRes.gameStatus = 'No one wins';
    } else {
        deckRes.dealerStatus = 'win';
    }

    let dStatus = (deckRes.dealerStatus) ? deckRes.dealerStatus : null,
        pStatus = (deckRes.playerStatus) ? deckRes.playerStatus : null,
        gStatus = (deckRes.gameStatus) ? deckRes.gameStatus : null;


    return {
        status: true,
        response: {
            deck: decks,
            draw:cardDraw,
            dealerHand: dealer,
            playerHand: player,
            dealerStatus: dStatus,
            playerStatus: pStatus,
            gameStatus: gStatus,
            id: deck_id
        }

    };

};

module.exports = methods;