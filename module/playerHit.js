const db = require('./db');
const score = require('./scoreCalculate');
let methods = {};


methods.drawPlayerCard = async (deck_id) => {
    let deckRes = await db.getDeck(deck_id);
    if (!deckRes) return { status: false, response: `deck not found for given id ${deck_id}` };

    let decks = deckRes.deck,
        player = deckRes.playerHand,
        dealer = deckRes.dealerHand;

    player.push(decks.shift());

    var playerScore = await score.scoreCal(player);
    if (playerScore > 21) {
        deckRes.playerStatus = 'bust';
        deckRes.dealerStatus = 'win';
    }

    let pstatus = (deckRes.playerStatus) ? deckRes.playerStatus : "stay",
        dstatus = (deckRes.dealerStatus) ? deckRes.dealerStatus : "stay";


    return {
        status: true,
        response: {
            deck: decks,
            dealerHand: dealer,
            playerHand: player,
            playerStatus: pstatus,
            dealerStatus: dstatus,
            id: deck_id
        }
    };

};


module.exports = methods;