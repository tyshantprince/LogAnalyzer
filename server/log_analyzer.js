const fs = require('fs');
const readline = require('readline');
const { EventEmitter } = require('events');
const io = require('socket.io-client');

const filePath = 'logs.txt';

const stats = {
  records: 0,
  types: {},
  avgProcessingSpeed: 0,
  maxWords: { message: '', wordCount: 0 },
};

const eventEmitter = new EventEmitter();

function processLogLine(line) {
  const [date, type, ...messageArray] = line.split(' ');
    const words = messageArray.length;
    const message = messageArray.join(' ');


  // Update statistics
  stats.records++;
  stats.types[type] = (stats.types[type] || 0) + 1;


  // Check and update Max word reference
  if (words > stats.maxWords.wordCount) {
    stats.maxWords.message = message;
    stats.maxWords.wordCount = words;
  }

  // Calculate average processing speed per minute
  const processingSpeed = stats.records / ((Date.now() - startTime) / 60000);
  stats.avgProcessingSpeed = processingSpeed.toFixed(2);
}


let getter = function getStats(){
  if(stats.records == 0){
    processLogFile()
  }
  return stats;
}

let run = function runProcess(){
    processLogFile()
 
}

function processLogFile() {
  const fileStream = fs.createReadStream(filePath);

  
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  rl.on('line', (line) => {
    processLogLine(line);
  });

  rl.on('close', () => {
  });
}

// Start processing the log file
const startTime = Date.now(); // For calculating processing speed

module.exports = { eventEmitter, getter, run };
