# KaleidElect

KaleidElect is an exploration into building an online voting DApp on the Kaleido blockchain. With KaleidElect, you are able to create two-candidate elections, have constituents vote, and see election results.


## Getting Started
1. Make sure the directory ```backend/data``` exists. This is to preserve MongoDB data outside of the container.
2. Make sure you have docker & docker-compose installed. Run ```docker-compose up -d``` to start the MongoDB container.
3. Run through the Kaleido [Quick Start](https://docs.kaleido.io/using-kaleido/quick-start/) to setup your own blockchain.
4. Create ```backend/config.js``` from ```backend/config.example.js``` and provide the required values.
5. In one terminal, run ```cd backend && npm i && npm start```.
6. In another terminal, run ```cd frontend && npm i && npm start```.