'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.use((req, res) => {
  const guests = ['something', 'yep', 'now', 'yes'];
  res.send(guests);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})
