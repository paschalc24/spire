import express from 'express';
import winston from 'winston';

const app = express();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple()
  ),
  transports: [
      new winston.transports.Console(),
      new winston.transports.File({filename: 'app.log'})
  ]
});

app.use(logger('dev'));
app.use(express.json());


const portMap = {
  "Students_Service": 4000,
  "Query_Service": 4003,
  "Departments_Service": 4001,
  "Carts_Service": 4002,
  "Enrolled_Service": 4003
}

app.post('/events', async (req, res) => {
  const event = req.body;
  logger.info(`(${process.pid}) Event Bus (Received Event) ${event.type}`);
  for (const port of Object.values(portMap)) {
    try {
      logger.info(`(${process.pid}) Event Bus (Sending Event to ${port}) ${event.type}`);
      await fetch(`http://localhost:${port}/events`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      logger.info(`(${process.pid}) Error (Sending Event to ${port}) ${event.type}`);
      console.log(err);
    }
  }
  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log(`(${process.pid}) Event Bus Listening on 4005`);
});