pragma solidity >=0.4.24 <8.0.0;
/**
  * @title Ballot
  * @dev Manage elections on the blockchain
  * TODO's: logic clean up and determining winner
  */
contract Ballot {
    address public ballotAddress;

    struct Candidate {
      string name;
      uint count;
    }

    struct Voter {
      bool voted;
      string vote;
    }

    Candidate[] public candidates;
    //Full transparency, can see who voted for who
    mapping (address => Voter) public voters;

    //Candidates must be determined at contract initiation, no write-in candidates
    constructor (string memory candidateOne, string memory candidateTwo) {
      ballotAddress = msg.sender;

      candidates.push(Candidate(candidateOne, 0));
      candidates.push(Candidate(candidateTwo, 0));
    }

    function endBallot() public {
      //TODO: return winner and self destruct?
      require(msg.sender == ballotAddress);

      selfdestruct(msg.sender);
    }

    //Assuming that the order of candidates is known, so use index to add votes
    function vote(uint index) public {
      //cannot vote twice
      require(!voters[msg.sender].voted);

      voters[msg.sender].vote = candidates[index].name;
      voters[msg.sender].voted = true;

      //record vote
      candidates[index].count = candidates[index].count++;
    }
}