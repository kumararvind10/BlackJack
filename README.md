# BlackJack
 A simple Blackjack API using Node.js and MongoDB.
 
 Game functionalities 
 
 *There are two MongoDB Schema.
    1. gameSchema -- For game functionality.
    2. gameHistorySchema -- For saving Data after each round in game.
 
 *Total 4 RESTful HTTP API i have created for a simple game functionality listening on port 8080 (or you can asign any poort based 
  on availability using environment variable "PORT" using process.env.PORT = PortNumber.
  Ex = process.env.PORT = 8000.
 -------------------------------------------------------------------------------------------------------------------- 
  1. Api endpoint --   This api for starting the game with some set of deck.
  
      Route - localhost:8080/game/initiate/:deck_count
      Method - GET
      Params - deck_count should be a valid number --> Its described how many deck you want to start game with.
  
  
      api will return response like 
      {
        "success": true,                       -----> Success Status
        "deck_id": "5ea56dde9221763dd067dd7a", ------> unique deck id for each set of deck
        "shuffled": true,                      ------> after creating deck based on deck_count it will sufflled and return status
        "remaining": 48,                       ------> after game deal between dealer and player, It will return remaining no.of card in the deck
        "playerId": "43402P"                  ------> player id will be unique throughout the game session to find history of the game
      }
  
  -------------------------------------------------------------------------------------------------------------------------------
  2. Api endpoint -- For player Hit 
      Route - localhost:8080/player/draw/:deck_id
      Method - GET
      params - deck_id -- Have to pass what you have got in 1st api response to diffrenciate between unique set of deck and Game
    
  
      api will return response like 
     {
       "success": true,                      ------> Success Status
       "deck_id": "5ea56dde9221763dd067dd7a",------> unique deck id for each set of deck( Current player)
       "Draw": true,                         ------> card Draw status based on wether player draw a card or not
       "remaining": 47,                      ------> remaining card available in deck after drawing
       "playerStatus": "stay",               ------> player status in game after card draw
       "DealerStatus": "stay",               ------> Dealer status in game after player card draw 
       "playerId": "43402P"                  ------> player id will be unique throughout the game session to find history of the
      }
---------------------------------------------------------------------------------------------------------------------------------------------

3. Api endpoint  -- For Dealer Hit

    Route - localhost:8080/dealer/draw/:deck_id
    Method - GET
    params - deck_id -- Have to pass what you have got in 1st api response to differentiate between unique set of deck and Game

    api will return response like
    
    {
      "success": true,                      ------> Success Status        
      "deck_id": "5ea56dde9221763dd067dd7a",------> unique deck id for each set of deck( Current player + dealer)
      "Draw": true,                         ------> card Draw status based on whether dealer draw a card or not
      "playerId": "43402P",                 ------> player id will be unique throughout the game session to find history of the
      "remaining": 45,                      ------> remaining card available in deck after drawing
      "DealerStatus": "win",                ------> dealer status after card draw
      "PlayerStatus": "bust",               ------> player status after dealer hit
      "GameStatus": null                    ------> Game status in case of both get same count (player and dealer)
    }
   ------------------------------------------------------------------------------------------------------------
   
   4. Api endpoint -- For getting history of player
      
      Route - localhost:8080/get/player/history/:player_id
      Method - GET
      params - player_id - Have to pass player id to get game history(This will get in every api hit response).
      
      
      api will return response like 
      
    {  
      "Status": true,       -----> Success Staus
      "res": [
       {
         "playerHand": [      ------> Details Response about Player History.
          {
          "suit": "spades",
          "value": "3",
          "cardVal": 3
         },
         {
          "suit": "spades",
          "value": "K",
          "cardVal": 10
        }
       ],
       "_id": "5ea56dde9221763dd067dd7b",
       "playerId": "43402P",
       "status": "true",
       "__v": 0
       },
        :
        :   Might be Many more ..........
        :
        :
      }
      
      -------------------------------------------------------------------------------------------------------------------------
      
      Submission
      
      I have deploy the code on herou too..
      
      endpoint https://blackjack-api-by-arvind.herokuapp.com/
      
      You can check all api endpoint on server too.
      
      
      
      Thank you.
