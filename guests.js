'use strict';

const fs = require('fs');
const path = require('path');
const guestsPath = path.join(__dirname, 'guests.json'); //__dirname is the name of the dir that you are in

const node = path.basename(process.argv[0]); //full path to node
const title = path.basename(process.argv[1]); //give you the file. perhaps the full path to that file
const cmd = process.argv[2]; // any additional arguments

if (cmd === 'read') {
  fs.readFile(guestsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const guests = JSON.parse(data);

    console.log(guests);
  });
} else if (cmd === 'create') {
  fs.readFile(guestsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }

    const guests = JSON.parse(data);
    const guest = process.argv[3];

    if (!guest) {
      console.error(`Usage ${node} ${title} ${cmd} GUEST_NAME`);
      process.exit(1);
    }

    guests.push(guest);

    const guestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, guestsJSON, (writeErr) => { //path/data/callback
      if (writeErr) {
        throw writeErr;

        console.log(guest);
      }
    });
  });
} else {
  console.error(`Usage: ${node} ${title} [read | create]`);
  process.exit(1); //exit strategy - anything non-zero
}
