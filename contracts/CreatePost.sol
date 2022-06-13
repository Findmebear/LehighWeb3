// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";   //perform console logs provided by hardhat

contract CreatePost {
  uint public postCount = 0;    //only positive values
  string public name = "CreatePost";
  //Mapping is a reference type as arrays and structs
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

  constructor(){
    
  }

  function createPost(string memory _videoHash, string memory _text, string memory _title) public {
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