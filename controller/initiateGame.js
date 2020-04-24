const express = require('express');
const router = express.Router();
const db = require('../module/db');
const initiateGame = require('../module/initiateGame');

router.post('/game/initiate/:deck_count', async (req, res, next) => {
    try {
        const deck_count = parseInt(req.params.deck_count);
        const pId = Math.floor(Math.random() * Math.floor(456738)) + "P";


        const result = await initiateGame.init(deck_count);

        let thisGame = new db.Game({
            deck: result.deck,
            playerId: pId,
            playerHand: result.playerHand,
            dealerHand: result.dealerHand,
            status: true,
        });


        let historyGame = new db.GameHistory({
            deck: result.deck,
            playerId: pId,
            playerHand: result.playerHand,
            dealerHand: result.dealerHand,
            status: true,
        });

        const response = await thisGame.save();
        await historyGame.save();

        let userRes = {

            success: true,
            deck_id: response._id,
            shuffled: true,
            remaining: response.deck.length,
            playerId: pId,


        };
        res.status(200).send(userRes);

    } catch (err) {
        res.status(400).send(err);
    }

});


module.exports = router;