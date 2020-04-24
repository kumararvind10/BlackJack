const db = require('./db');

module.exports.getPlayerHistory = async (player_id) => {
    const response = await db.getHistory(player_id);

    let result = [];
    for (let each of response) {
        let data = each.toObject();
        delete data.deck;
        delete data.dealerHand;
        result.push(data);
    }

    return {
        Status: true,
        res: result
    };

};

