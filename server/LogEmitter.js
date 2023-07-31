// logEmitter.js
const fs = require('fs');
const faker = require('faker');

const logFilePath = 'logs.txt';
const logTypes = ['success', 'info', 'error', ];

function generateRandomLog() {
  const type = logTypes[Math.floor(Math.random() * logTypes.length)];
  const timestamp = new Date().toISOString();
  const message = faker.lorem.words((Math.random() * 100));
  return `${timestamp} [${type}] ${message}\n`;
}

 const runLogger = () => {
  fs.appendFile(logFilePath, generateRandomLog(), (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

module.exports = {runLogger}