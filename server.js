const express = require('express');
const path = require('path');
const savedNotes = require('./db/db.json');
const uuid = require('./helpers/uuid');
const { readAndAppend } = require('./helpers/fsUtils');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {

        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);


        const data = fs.readFileSync(savedNotes);

        const madeNotes = JSON.parse(data);

        madeNotes.push(newNote);

        const noteString = JSON.stringify(madeNotes, null, 2);

        fs.writeFileSync('./db/db.json', noteString, (err) => {
            err
                ? console.error(err)
                : console.log(`New note has been added to JSON file`);
        });


        console.log(response);
    }
});

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);