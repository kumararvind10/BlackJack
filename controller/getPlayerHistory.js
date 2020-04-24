const express =  require('express');
const router =  express.Router();
const getHistory = require('../module/getPlayerHistory');


//api endpoint for getting player history
router.get('/get/player/history/:player_id', async (req, res, next) => {
    try {
        const player_id = req.params.player_id;
        const hisRes = await getHistory.getPlayerHistory(player_id);

        res.status(200).send(hisRes);

    } catch (err) {
        res.status(400).send(err);

    }
});

module.exports = router;