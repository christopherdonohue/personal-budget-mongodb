const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());



var fs = require('fs');
const budget = JSON.parse(fs.readFileSync('newFile.json', 'utf8'));



app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
console.log(`API served at http://localhost:${port}`) 
});