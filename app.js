const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/signup.html')
})



app.post('/', (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/6ad3aecbb0"

    const options = {
        method: "POST",
        auth: "robosipo:e42404130c7db29fe50fdef310a6e88f-us14"
    }

    const request = https.request(url, options, (response) => {

        if (response.statusCode === 200){
            res.send('successfully subscribed!')
        } else{
            res.send('an error occured while signing up, please try again!')
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData)
    request.end() 

});








app.listen(3001, (req, res) => {
    console.log('listening on port 3001')
})

// e42404130c7db29fe50fdef310a6e88f-us14 apiKey
// 6ad3aecbb0 list