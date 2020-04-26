const express = require('express');
const router = express.Router();
const draw = require('../module/playerHit');
const db = require('../module/db');
const score = require('../module/scoreCalculate');

//api endpoint for player draw card

router.get('/player/draw/:deck_id', async (req, res, next) => {

    try {
        const deck_id = req.params.deck_id;

        if (deck_id === ":deck_id") return res.status(400).send("<h1>please provide valid deck count<h1>");   // Not generic but for time being.


        let result = await draw.drawPlayerCard(deck_id);

        if (!result.status) return res.send(result);

        let param = {
            deck: result.response.deck,
            playerHand: result.response.playerHand,
            playerStatus: result.response.playerStatus,
            dealerStatus: result.response.dealerStatus,
            draw: true
        };
        let updateRes = await db.Game.updateOne({ _id: result.response.id }, { $set: param });

        if (!updateRes) return res.send("Something went wrong");

        const response = await db.getDeck(deck_id);

        let historyGame = new db.GameHistory({
            deck: response.deck,
            draw: true,
            playerId: response.playerId,
            playerHand: response.playerHand,
            dealerHand: response.dealerHand,
            playerStatus: response.playerStatus,
            dealerStatus: response.dealerStatus,
            status: true,
        });

        await historyGame.save();

        let userRes = {

            success: true,
            deck_id: response._id,
            Draw: true,
            remaining: response.deck.length,
            playerStatus: response.playerStatus,
            DealerStatus: response.dealerStatus,
            playerId: response.playerId

        };
        res.status(200).send(userRes);

    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = router;