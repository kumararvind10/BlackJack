let methods = {};

methods.scoreCal = async (hand) => {
    let score = 0;
    let numAce = 0;
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].cardVal) {
            score += hand[i].cardVal;
            if (hand[i].cardVal == 11) {
                numAce++;
            }
            for (let j = 0; j < numAce; j++) {
                if (score > 21 && numAce > 0) {
                    score -= 10;
                    numAce--;
                }
            }
        } else {
            return "card Value missing";
        }
    }
    //console.log(score);
    return score;
};


module.exports = methods;