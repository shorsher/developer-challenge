const express = require('express');
const mongo = require('../db/mongo')
const { ObjectID } = require('mongodb');

const {
  FROM_ADDRESS,
} = require('../config')

let electionController = (swaggerClient) => {
    let router = express.Router();

    router.post('/api/election', async (req, res) => {
      try{
        const { db } = mongo;
        const coll = db.collection('kaleido');

        Object.keys(req.body).forEach((element) => {
          console.log("element", element);
        })

        objs = [
          {
            _id: new ObjectID(),
            index: req.body.candidateOne.index,
            name: req.body.candidateOne.name,
            platform: req.body.candidateOne.platform,
          },
          {
            _id: new ObjectID(),
            index: req.body.candidateTwo.index,
            name: req.body.candidateTwo.name,
            platform: req.body.candidateTwo.platform,
          }
        ];

        result = await coll.insertMany(objs);
        // Note: we really only want to deploy a new instance of the contract
        //       when we are initializing our on-chain state for the first time.
        //       After that the application should keep track of the contract address.
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
      } catch (err) {
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
    return router;
}

module.exports = electionController;