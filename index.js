// Import express and request modules
var express = require('express');
var request = require('request');
var _ = require("lodash");

// Store our app's ID and Secret. These we got from Step 1.
// For this tutorial, we'll keep your API credentials right here. But for an actual app, you'll want to  store them securely in environment variables.

const CLIENT_ID=process.env.CLIENT_ID;
const CLIENT_SECRET=process.env.CLIENT_SECRET;
const ACCESS_TOKEN=process.env.ACCESS_TOKEN;

var app = express();
const PORT = 4390;

// Let's start our server
app.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Example app listening on port " + PORT);
});


// This route handles GET requests to our root ngrok address and responds with the same "Ngrok is working message" we used before
app.get('/', function(req, res) {
    res.send('Ngrok is working! Path Hit: ' + req.url);
});

// This route handles GET requests to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
app.get('/oauth', function(req, res) {
    // When a user authorizes an app, a "code" query parameter is passed on the oAuth endpoint. If that value is not there, we respond with an error message
    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
        // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
        request({
            url: 'https://slack.com/api/oauth.access', //URL to hit
            qs: {code: req.query.code, client_id: CLIENT_ID, client_secret:CLIENT_SECRET}, //Query string data
            method: 'GET', //Specify the method
        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
				// Show the result in the ngrok window. This will include the
				// token we'll use for other operations.
                j = res.json(body);
            }
        })
    }
});

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
app.post('/command', function(req, res) {
    request({
        url: 'https://slack.com/api/users.list', //URL to hit
        qs: {token: ACCESS_TOKEN, presence: true}, //Query string data
        method: 'GET', //Specify the method
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
		  // Sample command: show active users."});
          j = JSON.parse(body);
          var active = _.without(_.map(j.members, function(o) {
            if(o.presence == 'active') return o.name;
          }), undefined);
          res.send(_.join(active,', '));
        }
    })
});
