const express = require('express');
const mongo = require('../db')

const {
  FROM_ADDRESS,
} = require('../config')

let electionController = function (swaggerClient) {
    let router = express.Router();

    router.post('/api/election', async (req, res) => {
        // Note: we really only want to deploy a new instance of the contract
        //       when we are initializing our on-chain state for the first time.
        //       After that the application should keep track of the contract address.
        try {
            let postRes = await swaggerClient.apis.default.constructor_post({
            body: {
                candidateOne: req.body.candidateOne,
                candidateTwo: req.body.candidateTwo
            },
            "kld-from": FROM_ADDRESS,
            "kld-sync": "true"
            });
            res.status(200).send(postRes.body);
            console.log("Deployed instance: " + postRes.body.contractAddress);
        }
        catch(err) {
            res.status(500).send({error: `${err.response && err.response.body}\n${err.stack}`});
        }
    });

    router.post('/api/election/:address/vote', async (req, res) => {
      try {
        let postRes = await swaggerClient.apis.default.vote_post({
          address: req.params.address,
          body: {
            index: req.body.candidate
          },
          "kld-from": FROM_ADDRESS,
          "kld-sync": "true"
        });
        res.status(200).send(postRes.body)
      }
      catch(err) {
        res.status(500).send({error: `${err.response && err.response.body && err.response.text}\n${err.stack}`});
      }
    });

    router.get('/api/election/:address/results', async (req, res) => {
      try {
        let postRes = await swaggerClient.apis.default.getResults_get({
          address: req.params.address,
          "kld-from": FROM_ADDRESS,
          "kld-sync": "true"
        });
        res.status(200).send(postRes.body)
      }
      catch(err) {
        res.status(500).send({error: `${err.response && err.response.body && err.response.text}\n${err.stack}`});
      }
    });

    router.post('/api/election/candidates', async (req, res) => {
      const { db } = mongo;
      const electionColl = db.collection('election');

    });

    return router;

}

module.exports = electionController;