const { MongoClient } = require('mongodb');

const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_AUTH_DB
  } = require('../config');

  const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_AUTH_DB}`;

  /**
 * Listen for application termination and hangup the db
 */
process.on('SIGTERM', () => {
	console.log('mongo :: Received SIGTERM');
	const { client } = module.exports;
	if (client && client.close) {
		client.close().then(() => {
			console.log('mongo :: DB Closed');
		});
	}
});


async function connect () {
    try {
        let client = await MongoClient.connect(MONGO_URI);
        console.log(`DB connected: ${client.isConnected()}`);

        module.exports.client = client;
        return client;
    } catch (err) {
        throw Error(`error connecting to Mongo: ${err}`);
    }
}

module.exports = {
    connect
}