'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/guests', (req, res) => {
  const guests = ['something', 'yep', 'now', 'yes'];
  res.send(guests);
}); 

app.use((req, res) => {
  res.sendStatus(404);
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})
