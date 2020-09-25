const request = require('request-promise-native')
const express = require('express');
const archiver = require('archiver');
const Swagger = require('swagger-client');
const {URL} = require('url');
const bodyparser = require('body-parser');
const mongo = require("./db/mongo");
const electionController = require("./controllers/election");
const cors = require('cors');

const {
  KALEIDO_REST_GATEWAY_URL,
  KALEIDO_AUTH_USERNAME,
  KALEIDO_AUTH_PASSWORD,
  PORT,
  CONTRACT_MAIN_SOURCE_FILE,
  CONTRACT_CLASS_NAME
} = require('./config');

/**
 * Compiles contract code and returns a swagger client singleton for making
 * REST requests to our smart contract
 */
async function uploadContract() {
  // Kaleido example for compilation of your Smart Contract and generating a REST API
  // --------------------------------------------------------------------------------
  // Sends the contents of your contracts directory up to Kaleido on each startup.
  // Kaleido compiles you code and turns into a REST API (with OpenAPI/Swagger).
  // Instances can then be deployed and queried using this REST API
  // Note: we really only needed when the contract actually changes.
  const url = new URL(KALEIDO_REST_GATEWAY_URL);
  url.username = KALEIDO_AUTH_USERNAME;
  url.password = KALEIDO_AUTH_PASSWORD;
  url.pathname = "/abis";
  var archive = archiver('zip');
  archive.directory("contracts", "");
  await archive.finalize();
  let res = await request.post({
    url: url.href,
    qs: {
      compiler: "0.5", // Compiler version
      source: CONTRACT_MAIN_SOURCE_FILE, // Name of the file in the directory
      contract: `${CONTRACT_MAIN_SOURCE_FILE}:${CONTRACT_CLASS_NAME}` // Name of the contract in the
    },
    json: true,
    headers: {
      'content-type': 'multipart/form-data',
    },
    formData: {
      file: {
        value: archive,
        options: {
          filename: 'smartcontract.zip',
          contentType: 'application/zip',
          knownLength: archive.pointer()
        }
      }
    }
  });
  // Log out the built-in Kaleido UI you can use to exercise the contract from a browser
  url.pathname = res.path;
  url.search = '?ui';
  console.log(`Generated REST API: ${url}`);

  // Return a singleton swagger client for us to use
  return await Swagger(res.openapi, {
    requestInterceptor: req => {
      req.headers.authorization = `Basic ${Buffer.from(`${KALEIDO_AUTH_USERNAME}:${KALEIDO_AUTH_PASSWORD}`).toString("base64")}`;
    }
  });
}

async function main() {
  try {
    await mongo.connect();
    const app = express();
    app.use(cors());
    app.use(bodyparser.json());
    let swaggerClient = await uploadContract();

    app.use(electionController(swaggerClient));
    app.listen(PORT, () => console.log(`kaleido dapp backend listening on port ${PORT}!`));

  } catch (err) {
    throw err;
  }
}

main().catch(err => {
  console.error(err.stack);
  process.exit(1);
});
