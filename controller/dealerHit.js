const express = require('express');
const router = express.Router();
const draw = require('../module/dealerHit');
const db = require('../module/db');


router.post('/dealer/draw/:deck_id', async (req, res, next) => {
    try {
        let param;

        const deck_id = req.params.deck_id;

        let dealerDeckRes = await draw.dealerDeckDraw(deck_id);

        if (!dealerDeckRes.status) return res.send(dealerDeckRes);

        let dealerRes = dealerDeckRes.response;

        if (dealerRes.playerStatus === 'bust') {
            param = {
                dealerStatus: dealerRes.dealerStatus,
                draw:false
            };
        } else {
            if (dealerRes.dealerStatus === 'win') {
                dealerRes.playerStatus = 'bust';
            }else{
                dealerRes.dealerStatus = 'bust';
            }
            param = {
                deck: dealerRes.deck,
                draw: dealerRes.draw,
                dealerHand: dealerRes.dealerHand,
                dealerStatus: dealerRes.dealerStatus,
                playerStatus: dealerRes.playerStatus,
                gameStatus: dealerRes.gameStatus
            };
        }

        let updateRes = await db.Game.updateOne({ _id: dealerRes.id }, { $set: param });

        if (!updateRes) return res.send("Something went wrong");

        const response = await db.getDeck(deck_id);

        let historyGame = new db.GameHistory({
            deck: response.deck,
            draw: response.draw,
            playerId: response.playerId,
            playerHand: response.playerHand,
            dealerHand: response.dealerHand,
            playerStatus: response.playerStatus,
            dealerStatus: response.dealerStatus,
            GameStatus: response.gameStatus
        });

        await historyGame.save();

        let userRes = {
            success: true,
            draw: response.draw,
            deck_id: response._id,
            playerId: response.playerId,
            remaining: response.deck.length,
            DealerStatus: response.dealerStatus,
            PlayerStatus: response.playerStatus,
            GameStatus: response.gameStatus

        };
        res.status(200).send(userRes);

    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;