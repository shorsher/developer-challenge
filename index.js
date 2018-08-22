const KaleidoSetup = require('consortium-setup-utility/consortium-setup');
const interviewConsortium = require('./config/interview-consortium.json');
const dontRecreateApplicationCredentials = false;
const API_KEY = process.argv[2];

if(!API_KEY) console.log('\x1b[37m\x1b[41m%s\x1b[0m', '\n  You must provide an API Key to create a consortium  \n');
else {

    let kaleidoSetup = new KaleidoSetup(API_KEY);

    kaleidoSetup.setup(interviewConsortium,dontRecreateApplicationCredentials).then((result)=>{
        console.log('\x1b[30m\x1b[42m%s\x1b[0m', '\n  Consortium successfully setup  \n');

        console.log(JSON.stringify(result, null, 2));

        let url1 = result.nodes[0][0].urls.rpc;
        let username1 = result.applicationCredentials[0][0].username;
        let password1 = result.applicationCredentials[0][0].password;

        console.log('\x1b[37m\x1b[44m%s\x1b[0m', '\n  Connection information (Worldwide Co.\' node)  \n');

        console.log('URL: ' + url1);
        console.log('User: ' + username1);
        console.log('Password: ' + password1);

        let url2 = result.nodes[0][1].urls.rpc;
        let username2 = result.applicationCredentials[0][1].username;
        let password2 = result.applicationCredentials[0][1].password;

        console.log('\x1b[37m\x1b[44m%s\x1b[0m', '\n  Connection information (Global Corp.\' node)  \n');

        console.log('URL: ' + url2);
        console.log('User: ' + username2);
        console.log('Password: ' + password2);
    }).catch((error) => {
        console.log('\x1b[37m\x1b[41m%s\x1b[0m', '\n  An error occurred while setting up the consortium  \n');
        console.log(error.message)
    })
}

