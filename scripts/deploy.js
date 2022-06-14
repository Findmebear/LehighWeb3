const hre = require("hardhat");

const main = async () => {

  const CreatePost = await hre.ethers.getContractFactory("CreatePost");
  const createPost = await CreatePost.deploy();

  await createPost.deployed();

  console.log("CreatePost deployed to:", createPost.address);
}

const runMain = async () => {
  try{
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();