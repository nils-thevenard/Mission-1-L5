// API 2 converting claim history into a rating

function calculateRisk(input) {
  //check the string first to make sure it is valid
  try {
    // Check if input is an empty string
    if (input.trim() === "") {
      throw new Error();
    }
  } catch (error) {
    // Handle the error (e.g., log it or rethrow)
    return "Error please provide claim history";
  }
  const keyWords = ["smash", "crash", "bump", "scratch", "collide"];
  let count = 0;
  // Split the user input into words
  const words = input.split(" ");
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

module.exports = calculateRisk;
