const express = require('express');
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) => {
    return res.json(notes);    
});

app.post('/api/notes', (req, res) => {


    const newNote = {
        title,
        text,
        note_id: uuid(),
    };
});