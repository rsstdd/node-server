'use strict';

const fs = require('fs');
const path = require('path');
const guestsPath = path.join(__dirname, 'guests.json'); //__dirname is the name of the dir that you are in

fs.readFile(guestsPath, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  const guests = JSON.parse(data);

  console.log(guests);
})
