
const requestPromise = require('request-promise');
const app = require('express')();
const bodyParser = require('body-parser');

//REPLACE YOUR API KEY HRE
const API_KEY = 'INSERT AN API KEY HERE';

function getConsortium(req,res){
        requestPromise({
            uri : 'https://console.kaleido.io/api/v1/consortia',
            headers : {
                'Authorization' : `Bearer ${API_KEY}` 
            },
            json :true
        }).then((resp)=>{
            res.send(resp);
        }).catch((error)=>{
            if(error.statusCode && error.message) res.status(error.statusCode).send(error.message);
            else res.status(500).send('Internal Error');
            throw(error);
        })
}

app.get('/consortia',bodyParser.json(), getConsortium);

app.listen(4000,()=>{
    console.log('Sample API Listening on Port 4000')
});