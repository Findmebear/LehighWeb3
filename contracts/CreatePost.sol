pragma solidity ^0.8.4;

contract CreatePost {
  uint public postCount = 0;
  string public name = "CreatePost";
  mapping(uint => Post) public posts;

  struct Post {
    uint id;
    string text;
    string hash;
    string title;
    address author;
  }

  event PostCreated(
    uint id,
    string text,
    string hash,
    string title,
    address author
  );

  constructor() public{
  }

  function createPost(string memory _videoHash, string memory _title, string memory _text) public {
    // Make sure the text exists and smaller than 500 
    require(bytes(_text).length > 0 && bytes(_text).length < 501);
    // Make sure the video hash exists
    require(bytes(_videoHash).length > 0);
    // Make sure video title exists
    require(bytes(_title).length > 0);
    // Make sure uploader address exists
    require(msg.sender!=address(0));

    // Increment video id
    postCount++;

    // Add video to the contract
    posts[postCount] = Post(postCount, _text, _videoHash, _title, msg.sender);
    // Trigger an event
    emit PostCreated(postCount, _text, _videoHash, _title, msg.sender); 
  }
}