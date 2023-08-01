import socketIO from 'socket.io'
import analyzeLog from '../server/log_analyzer'
import jwt from 'jsonwebtoken';
import { CronJob } from "cron";
import { runLogger } from '../server/LogEmitter';



export default (_, nuxt) => {
  nuxt.hook('listen', server => {
    const io = socketIO(server);
    // Secret key used to sign and verify JWT tokens
    const secretKey = 'Veeam Is A Great Company';
    io.use((socket, next) => {
      const token = socket.handshake.query.token;
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.log(err)
          return next(new Error('Authentication error'));
        }
        next();
      });
    })

    nuxt.hook('close', () => io.close())

    io.on('connection', () => {
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
    })
  })
}
