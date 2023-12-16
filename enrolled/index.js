import express from 'express';
import cors from 'cors';
// import logger from 'morgan';
import Store from './store.js';
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
app.use(cors());
app.use(express.json());


app.get('/carts/:id', (req, res) => {
  console.log(`(${process.pid}) Carts Service: GET BY ID/cart/${req.params.id}`);
  const carts = Store.read();
  const id = req.params.id;
  if (carts[id] === undefined) {
    res.status(404).end();
  }
  else {
    const cart = carts[id];
    console.log(`(${process.pid}) Carts Service: ${JSON.stringify(cart)}`);
    res.status(200).send(cart);
  }
});

app.delete('/carts/:id/:courseId', (req, res) => {
  console.log(`(${process.pid}) Carts Service: DELETE BY ID/cart/${req.params.id}`);
  let carts = Store.read();
  const id = req.params.id;
  if (carts[id] === undefined) {
    res.status(404).end();
  }
  else {
    let cart = carts[id];
    cart = cart.filter(e => e !== req.params.courseId)
    carts[id] = cart;
    Store.write(carts);
    console.log(`(${process.pid}) Carts Service: ${JSON.stringify(cart)}`);
    res.status(200).send(cart);
  }
});

app.post('/carts/:id/:courseId', async (req, res) => {
  // Spire ID:
  const carts = Store.read();
  console.log(`(${process.pid}) Carts Service: ${JSON.stringify(carts)}`);

  carts[req.params.id].push(req.params.courseId);
  Store.write(carts);

  // try {
  //   await fetch('http://localhost:4005/events', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       type: 'StudentCreated',
  //       data: {
  //         id,
  //         firstName, 
  //         lastName,
  //         departments,
  //         gpa,
  //         major_gpa,
  //         academic_year,
  //         advisor,
  //         standing,
  //         credits,
  //         specializations,
  //         expected_grad 
  //       },
  //     }),
  //   });
  // } catch (err) {
  //   console.log(`(${process.pid}) Students Service: ${err}`);
  //   res.status(500).send({
  //     status: 'ERROR',
  //     message: err,
  //   });
  // }

  res.status(201).send(carts[req.params.id]);
  console.log(`(${process.pid}) Carts Service: ${JSON.stringify(carts)}`);
});

app.post('/events', async (req, res) => {
  const event = req.body;
  const type = event.type;
  console.log(`(${process.pid}) Carts Service Received Event: ${type}`);
  res.send({});
});

const emitPostCreatedEvent = async (res, id, title) => {};

app.listen(4002, () => {
  console.log(`(${process.pid}) Carts Service: Listening on 4002`);
});
