const express = require('express');
const mongo = require('../db/mongo')
const { ObjectID } = require('mongodb');

const {
  FROM_ADDRESS,
} = require('../config')

let electionController = (swaggerClient) => {
    let router = express.Router();

    router.get('/api/election/candidates/:address', async (req, res) => {
      try {
        const { db } = mongo;
        const coll = db.collection('candidates');
        const ballotAddress = req?.params?.address || '';
        const query = {
          address: ballotAddress
        };

        const candidates = await coll.find(query).toArray();
        const resp = {};
        resp.candidates = candidates;
        res.status(200).send(resp);
      }
      catch(err) {
        res.status(500).send({error: `${err.response && err.response.body && err.response.text}\n${err.stack}`});
      }
    });

    router.post('/api/election', async (req, res) => {
      try{
        const { db } = mongo;

        // Note: we really only want to deploy a new instance of the contract
        //       when we are initializing our on-chain state for the first time.
        //       After that the application should keep track of the contract address.
        let postRes = await swaggerClient.apis.default.constructor_post({
        body: {
            candidateOne: req.body.candidateOne.name,
            candidateTwo: req.body.candidateTwo.name
        },
        "kld-from": FROM_ADDRESS,
        "kld-sync": "true"
        });

        const coll = db.collection('candidates');
        objs = [
          {
            _id: new ObjectID(),
            index: req.body.candidateOne.index,
            name: req.body.candidateOne.name,
            platform: req.body.candidateOne.platform,
            address: postRes.body.contractAddress,
          },
          {
            _id: new ObjectID(),
            index: req.body.candidateTwo.index,
            name: req.body.candidateTwo.name,
            platform: req.body.candidateTwo.platform,
            address: postRes.body.contractAddress,
          }
        ];
        result = await coll.insertMany(objs);

        res.status(200).send(postRes.body);
        console.log("Deployed instance: " + postRes.body.contractAddress);
      } catch (err) {
        console.log(err);
        res.status(500).send({error: `${err.response && err.response.body}\n${err.stack}`});
      }
    });

    router.post('/api/election/vote', async (req, res) => {
      try {
        let postRes = await swaggerClient.apis.default.vote_post({
          address: req.body.address,
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

    router.get('/api/election/results/:address', async (req, res) => {
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