import socketIO, { Server } from 'socket.io'
import http from 'http';
import cors from 'cors'; // Import the cors middleware
import analyzeLog from '../server/log_analyzer'


import { CronJob } from "cron";
import { runLogger } from '../server/LogEmitter';


// Create the HTTP server
const server = http.createServer();

// Apply the cors middleware directly to the HTTP server
server.on('request', cors());

// Pass the HTTP server to socket.io to create the WebSocket server
const io = socketIO(server);

io.on('connection', (socket) => {

  var generateLogs = new CronJob(
    '*/3 * * * * *',
    function () {
      runLogger();
    },
    null,
    true,
    'America/Chicago',
  );

  var runAnalyzer = new CronJob(
    '*/3 * * * * *',
    async function () {
      var stats = await analyzeLog('./logs.txt');
      io.emit('runupdate', stats)
    },
    null,
    true,
    'America/Chicago',
    io
  );

    // Handle disconnection if needed
    socket.on('disconnect', () => {
      console.log('A log analyzer disconnected');
    });
  });

// Start the server on port 3001
const port = 3001;
server.listen(port, () => {
  console.log(`WebSocket server listening on http://localhost:${port}`);
});



export default (_, nuxt) => {
  
}