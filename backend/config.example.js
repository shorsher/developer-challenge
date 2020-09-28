module.exports = {
  PORT: 4000,
  // Connectivity details for the node
  // ** Make sure you take the "-connect" URL for your node here, which is the REST API Gateway **
  KALEIDO_REST_GATEWAY_URL: "https://u0b0lkhs4v-u0xm86oxwt-connect.us0-aws.kaleido.io/",
  KALEIDO_AUTH_USERNAME: "u0oqek488k",
  KALEIDO_AUTH_PASSWORD: "NGS5EVWfCcyA7dWA9fM6uU4xqVh7sYzEtl-2NTk_Eh0",
  // Details of the contract source code in the contracts directory
  // ** if you pull in pre-reqs like OpenZeppelin, just put them all inside the contracts directory **
  CONTRACT_MAIN_SOURCE_FILE: "simplestorage.sol", // filename
  CONTRACT_CLASS_NAME: "simplestorage" // Solidity class within the file
}


//Authorization: Basic dTBvcWVrNDg4azpOR1M1RVZXZkNjeUE3ZFdBOWZNNnVVNHhxVmg3c1l6RXRsLTJOVGtfRWgw