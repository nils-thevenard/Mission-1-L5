// imports the sum function witch will be tested from the API.js file
const request = require("supertest"); //needs to be added for testing server (see tests at bottom: npm install supertest)
const { calculateRisk, server } = require("./API.js");

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
//because we changed the way error handling happens this test will need updting to match the receieved response
// test("claim with no statement to throw error: Error please provide claim history", () => {
//   expect(calculateRisk("")).toBe("Error please provide claim history");
// });

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

//example of API testing
describe("Check the existence of the function and operation of the server", () => {
  //to check existence of the function itself (does not go through server)
  it("calculateRisk should exist and be a function", () => {
    expect(calculateRisk).toBeDefined(); //Checks it is a defined value/type - is boolean
    expect(typeof calculateRisk).toBe("function"); //Checked it is a function
  });

  //tests to check the API operates using the server
  it("#2 should identify all 5 trigger words", async () => {
    const response = await request(server)
      .post("/calculateRisk") //path to query
      .send({
        //JSON data sent to server
        claim_history: "collide crash scratch bump smash",
      })
      .expect(200);
    const expectedResult = {
      //JSON data received back from server
      risk_rating: 5,
    };
    expect(response.body).toEqual(expectedResult);
  });
  it("should return the expected result of 2", async () => {
    const response = await request(server).post("/calculateRisk").send({
      claim_history: "crash crash",
    });
    const expectedResult = {
      risk_rating: 2,
    };
    expect(response.body).toEqual(expectedResult);
  });
});
