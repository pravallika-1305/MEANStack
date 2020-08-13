const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//const fast2sms = require('fast2sms');
const axios = require("axios");
const { response } = require("express");
 
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
//require('dotenv').config();
//const options = {API_KEY: "DN0gTXINN3CtVlhJCtbCmxMhyXwX2ezNC075EFqjfVkhg4vaMzNoaNTTF8Bi"};

app.post("/sendSMS", async function (req, res) {
    console.log("request received");
    let user = req.body;
    const message = `Hi ${user.name}! here's your message - ${user.message}`;
    var url = 'https://api.textlocal.in/send/?apikey=thhBMyhJQJI-aToi5XOJL8gsERQGTturhwxwZyijL9&numbers=' + `${user.phone}` + '&sender=TXTLCL&message=' + encodeURIComponent(message);
    axios
        .get(url)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        },
            res.send(response));
});
app.listen(3000);