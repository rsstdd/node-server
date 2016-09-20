'use strict';

const fs = require('fs');
const path = require('path');
const guestsPath = path.join(__dirname, 'guests.json');

const http = require('http');
const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/guests') {
    fs.readFile(guestsPath, 'utf8', (err, guestsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(guestsJSON);
    });
  } else if (req.method === 'GET' && req.url === '/guests/0') {
    fs.readFile(guestsPath, 'utf8', (err, guestsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      const guests = JSON.parse(guestsJSON);
      const guestJSON = JSON.stringify(guests[1]);

      res.setHeader('Content-Type', 'text/plain');
      res.end(guestJSON);
    });
  } else if (req.method === 'GET' && req.url === '/guests/1') {
    fs.readFile(guestsPath, 'utf8', (err, guestsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      const guests = JSON.parse(guestsJSON);
      const guestJSON = JSON.stringify(guests[1]);

      res.setHeader('Content-Type', 'text/plain');
      res.end(guestJSON);
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
