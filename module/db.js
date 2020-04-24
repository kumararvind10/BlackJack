const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const config = require('config');
let methods = {};
let connectionStr = config.get('db.dbUrl');


// connection to mongoDb.
mongoose.connect(connectionStr) // mongodb://localhost:27017/PlayingCard   ---- for your reference only.
    .then(() => console.log("connected to Mongo db..."))
    .catch((err) => console.error("could not connect to MongoDb ", err));



// game Schema for BlackJack game
const gameSchema = new mongoose.Schema({
    id: ObjectId,
    playerId: String,
    deck: [],
    playerHand: [],
    dealerHand: [],
    playerStatus: String,
    dealerStatus: String,
    gameStatus: String,
    status: String,
    draw: Boolean
});


//Schema for getting History of the player
const gameHistorySchema = new mongoose.Schema({
    id: ObjectId,
    playerId: String,
    deck: [],
    playerHand: [],
    dealerHand: [],
    playerStatus: String,
    dealerStatus: String,
    gameStatus: String,
    status: String,
    draw: Boolean
});

//model define for all schema
methods.Game = mongoose.model('game', gameSchema);
methods.GameHistory = mongoose.model('gameHistory', gameHistorySchema);

//util method to get deck based on deck id
methods.getDeck = async (deck_id) => {
    const Game = mongoose.model('game', gameSchema);
    const result = await Game.findOne({ _id: deck_id });
    return result;
};

//util method to get history of player based on player id
methods.getHistory = async (id) => {
    const GameHistory = mongoose.model('gameHistory', gameHistorySchema);
    const result = await GameHistory.find({ playerId: id });
    return result;
};


module.exports = methods;