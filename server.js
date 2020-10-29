const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const mongoose = require("mongoose")
const chartModel = require('./Model/chart_schema')
const bodyParser = require("body-parser");
let url = 'mongodb://localhost:27017/pb_chart';

app.use(cors())
app.use(express.json());

app.use('/', express.static('public'));


app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log("Connection Successful")
            chartModel.find({})
                .then((data) => {
                    res.json(data)
                    mongoose.connection.close()
                })
                .catch((connectionError) => {
                    console.log(connectionError)
                })
        })
        .catch((connectionError) => {
            console.log(connectionError)
        })
});

app.put("/addData", (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection Successful")
         newData = {
            title: req.body.title,
            value: req.body.value,
            color: req.body.color
        }
        chartModel.insertMany(newData) 
                .then((data) => {
                    console.log(data)
                    res.json("Data Added")
                    mongoose.connection.close()
                })
                .catch((connectionError) => {
                    console.log(connectionError)
                    res.send("Error")
                })
            })
            .catch((connectionError) => {
                console.log(connectionError)
                res.send("Error")
            })
})

app.listen(port, () => {
console.log(`API served at http://localhost:${port}`) 
});