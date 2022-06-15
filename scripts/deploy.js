<<<<<<< HEAD
const hre = require("hardhat");

const main = async () => {

  const CreatePost = await hre.ethers.getContractFactory("CreatePost");
  const createPost = await CreatePost.deploy();

  await createPost.deployed();

  console.log("CreatePost deployed to:", createPost.address);
}

const runMain = async () => {
  try{
=======
const main = async () => {
  const createPostFactory = await hre.ethers.getContractFactory("CreatePost");
  const createPost = await createPostFactory.deploy();

  await createPost.deployed();

  console.log("Create Post address: ", createPost.address);
};

const runMain = async () => {
  try {
>>>>>>> 7a1915dab856fb70e6df879e654af350b8531f9e
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> 7a1915dab856fb70e6df879e654af350b8531f9e

runMain();