// imports the sum function witch will be tested from the API.js file
const calculateRisk = require("./API.js");

test("claim with 3 key words to return Risk Rating 3", () => {
  expect(
    calculateRisk(
      "My only claim was a crash into my house garage door that left a scratch on my car.  There  are are no other crashes",
      "crash"
    )
  ).toBe(3);
});

test("claim with 3 key words and numbers to return Risk Rating 3", () => {
  expect(
    calculateRisk(
      "My 1 claim was a crash into my house's garage door that left a 1mm scratch on my car.  There are no other crashes."
    )
  ).toBe(3);
});

test("claim with no keywords to return Risk Rating 1", () => {
  expect(
    calculateRisk(
      "My only claim was a smack into my house's garage door that left a cut on my car.  There are no other incidents."
    )
  ).toBe(1);
});

test("claim with no statement to throw error: Error please provide claim history", () => {
  expect(calculateRisk("")).toBe("Error please provide claim history");
});

test("claim with more than 5 keywords to return Risk Rating 5", () => {
  expect(
    calculateRisk(
      "My only claims were a crash, into my house's garage door that left a scratch on my door a scratch on my bumper and a bump in my bumper.  I also crashed into a tree and my window went smash."
    )
  ).toBe(5);
});

test("claim with 1 key words, numbers and special characters to return Risk Rating 1", () => {
  expect(
    calculateRisk(
      "My only claim was a reverse into a garage door @ my house that left a scratch on my car which cost $500 to fix. There are no other incidents."
    )
  ).toBe(1);
});
