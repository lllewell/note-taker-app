const express = require('express');
const path = require('path');
const savedNotes = require('./Develop/db/db.json');
const uuid = require('./Develop/helpers/uuid');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const newNote = {
        title,
        text,
        note_id: uuid(),
    };

    const data = fs.readFileSync(savedNotes);

    const madeNotes = JSON.parse(data);

    madeNotes.push(newNote);

    const noteString = JSON.stringify(madeNotes, null, 2);

    fs.writeFileSync('./Develop/db/db.json', noteString, (err) => {
        err
            ? console.error(err)
            : console.log(`New note has been added to JSON file`);
    });

    const response = {
        status: 'success',
        body: newNote,
    };

    console.log(response);
});

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);