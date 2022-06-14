const { expect } = require("chai");
const { Contract } = require("ethers");
const { ethers } = require("hardhat");

contract('PTube', ([deployer, author]) => {
  let PTube

  before(async () => {
    PTube = await PTube.deployed()
  })

describe()
// describe("CreatePost", function () {
//   it("Should return the new Post", async function () {
//     const CreatePost = await ethers.getContractFactory("CreatePost");
//     const createPost = await CreatePost.deploy("Hello, world!", "Hello, world!", "Hello, world!");
//     await createPost.deployed();

//     expect(await createPost.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await createPost.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await createPost.greet()).to.equal("Hola, mundo!");
//   });
// });