const db = require('./db');

module.exports.getPlayerHistory = async (player_id) => {
    const response = await db.getHistory(player_id);
    
    if(!response.status) return `<h2>There is no history in database for the given player id ${player_id}<h2>`;

    let result = [];
    for (let each of response.response) {
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

