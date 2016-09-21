'use strict';

const fs = require('fs');
const path = require('path');
const guestsPath = path.join(__dirname, 'guests.json');

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const morgan = require('morgan');

app.disable('x-powered-by');
app.use(morgan('short'));

app.use((req, res, next) => {
  let bodyJSON = '';

  req.on('data', (chunk) => {
    bodyJSON += chunk.toString();
  });

  req.on('end', () => {
    let body;

    if (bodyJSON !== '') {
      body = JSON.parse(bodyJSON);
    }

    req.body = body;

    next();
  });
});

app.get('/guests', (req, res) => {
  fs.readFile(guestsPath, 'utf8', (err, guestsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    const guests = JSON.parse(guestsJSON);

    res.send(guests);
  })
});

app.post('/guests', (req, res) => {
  fs.readFile(guestsPath, 'utf8', (readErr, guestsJSON) => {
    if (readErr) {
      console.error(readErr);

      return res.sendStatus(500);
    }

    const guests = JSON.parse(guestsJSON);
    const guest = req.body.name;

    if(!guest) {
      return res.sendStatus(400);
    }

    guests.push(guest);

    const newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr);

        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

app.get('/guests/:id', (req, res) => {
  fs.readFile(guestsPath, 'utf8', (err, guestsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    const id = Number.parseInt(req.params.id);
    const guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404); // return exits the fn
    }

    res.set('Content-Type', 'text/plain');
    res.send(guests[id]);
  });
});

app.use((req, res) => {
  res.sendStatus(404);
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})
