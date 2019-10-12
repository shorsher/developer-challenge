pragma solidity >=0.4.24 <0.6.0;
/**
  * @title Simple Storage
  * @dev Read and write values to the chain
  */
contract simplestorage {
    uint public _x;
    /**
      * @dev Constructor sets the default value
      * @param x The initial value
      */
    constructor(uint x) public {
        _x = x;
    }
    /**
      * @dev Set the value
      * @param x The new value
      */
    function set(uint x) public {
        _x = x;
    }
    /**
      * @dev Get the value
      */
    function get() public view returns (uint x) {
        return _x;
    }
}