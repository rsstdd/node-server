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

// app.use((req, res, next) => {
//   const start = new Date();
//   next();
//   const end = new Date();
//   console.log(req.method, req.url, res.statusCode, end - start, 'ms');
// });

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
