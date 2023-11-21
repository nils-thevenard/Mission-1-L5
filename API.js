//Making an update for the lecture!

// API 2 converting claim history into a rating

//we should seperate the function and supply it through server
//we setup the server like this
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
server.use(bodyParser.json());
server.listen(8001, () => {
  console.log('Server started and listening on port 8001');
});

//now we can create a path route for the API to pass the data to the correct function
//this would also be a good place to check the user input contains data and is not empty and define the error response
//defining the errors in the server means we don't have to call the function at all, reducing load and data handling
server.post('/calculateRisk', (req, res) => {
  const { claim_history } = req.body; //because our API is taking a JSON, we should seperate the data to a variable which we pass to the function, we also need to match the variable name to the JSON entry
  if (typeof claim_history !== 'string' || claim_history.length < 1 ) {
    res.status(400).json({ error: "there is an error string" }); //when we return an error on the server, we should include a status code to define what the error type is to the end point
  }
  try {
      const riskRating = calculateRisk(claim_history);
      res.json({ risk_rating: riskRating }); //we should return the same format of data as we received, JSON
  } 
  catch (error) {
      res.status(400).json({ error: "there is an error response" }); 
  }
});


function calculateRisk(input) {
  //if we put the defined variables at the top we can identify what's being used inside the function easier
  const keyWords = ["smash", "crash", "bump", "scratch", "collide"];
  const words = input.split(" ");
  let count = 0;
  //because we added error handling to the server, we can remove the code for checking if the string is valid from here
  //For loop to check word list against the triggers
  for (const word of words) { 
    if (
      keyWords.some((key) => word.toLowerCase().includes(key.toLowerCase()))
    ) {
      count++;
    }
    // Break out of the loop when count reaches 5
    if (count === 5) {
      break;
    }
  }
  // Set count to 1 if it is still 0
  if (count === 0) {
    count = 1;
  }
  return count;
}

module.exports = { calculateRisk, server };
