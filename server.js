const express = require('express');
const notes = require('./db/db.json');
const fs = require('fs');

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);