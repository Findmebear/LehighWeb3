const main = async () => {
  const createPostFactory = await hre.ethers.getContractFactory("CreatePost");
  const createPost = await createPostFactory.deploy();

  await createPost.deployed();

  console.log("Create Post address: ", createPost.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();