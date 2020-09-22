// hope this is ok :-)
pragma experimental ABIEncoderV2;
// pragma solidity >=0.4.24 <8.0.0;
/**
  * @title Ballot
  * @dev Manage elections on the blockchain
  */
contract Ballot {
    address public ballotAddress;

    bool public inProgress;

    struct Candidate {
      string name;
      uint count;
    }

    struct Voter {
      bool voted;
      string vote;
    }

    Candidate[] public candidates;
    mapping (address => Voter) public voters;

    //Candidates must be determined at contract initiation, no write-in candidates
    constructor (string memory candidateOne, string memory candidateTwo) public {
      ballotAddress = msg.sender;

      candidates.push(Candidate(candidateOne, 0));
      candidates.push(Candidate(candidateTwo, 0));

      inProgress = true;
    }

    function getResults() public returns (Candidate[] memory results) {
      require(msg.sender == ballotAddress, "Restricted to ballot creator");
      inProgress = false;
      return candidates;
    }

    //Assuming that the order of candidates is known, so use index to add votes
    function vote(uint index) public {
      require(!voters[msg.sender].voted, "You cannot vote twice");
      require(inProgress, "The voting period has ended");

      voters[msg.sender].vote = candidates[index].name;
      voters[msg.sender].voted = true;

      //record vote
      candidates[index].count = candidates[index].count + 1;
    }
}