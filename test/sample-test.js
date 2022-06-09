const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CreatePost", function () {
  it("Should return the new Post", async function () {
    const CreatePost = await ethers.getContractFactory("CreatePost");
    const createPost = await CreatePost.deploy("Hello, world!", "Hello, world!", "Hello, world!");
    await createPost.deployed();

    expect(await createPost.greet()).to.equal("Hello, world!");

    const setGreetingTx = await createPost.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
