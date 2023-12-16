import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import Store from './store.js';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());


app.get('/enrolled/:id', (req, res) => {
  console.log(`(${process.pid}) Enrolled Service: GET BY ID/cart/${req.params.id}`);
  const enrolled = Store.read();
  const id = req.params.id;
  if (enrolled[id] === undefined) {
    res.status(404).end();
  }
  else {
    const cart = enrolled[id];
    console.log(`(${process.pid}) Enrolled Service: ${JSON.stringify(cart)}`);
    res.status(200).send(cart);
  }
});

app.delete('/enrolled/:id/:courseId', async (req, res) => {
  console.log(`(${process.pid}) Enrolled Service: DELETE BY ID/cart/${req.params.id}`);
  let enrolled = Store.read();
  const id = req.params.id;
  if (enrolled[id] === undefined) {
    res.status(404).end();
  }
  else {
    let cart = enrolled[id];
    cart = cart.filter(e => e !== req.params.courseId)
    enrolled[id] = cart;
    Store.write(enrolled);
    console.log(`(${process.pid}) Enrolled Service: ${JSON.stringify(cart)}`);
    try {
      await fetch('http://localhost:4005/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'EnrolledEntryDeleted',
          data: {
            id: req.params.id,
            courseId: req.params.courseId,
          },
        }),
      });
    }
    catch (err) {
      console.log(`(${process.pid}) Enrolled Service: ${err}`);
      res.status(500).send({
        status: 'ERROR',
        message: err,
    });
  }
    res.status(200).send(cart);
  }
});

app.post('/enrolled/:id/:courseId', async (req, res) => {
  // Spire ID:
  const enrolled = Store.read();
  console.log(`(${process.pid}) Enrolled Service: ${JSON.stringify(enrolled)}`);

  enrolled[req.params.id].push(req.params.courseId);
  Store.write(enrolled);

  try {
    await fetch('http://localhost:4005/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'EnrolledEntryCreated',
        data: {
          id: req.params.id,
          courseId: req.params.courseId
        },
      }),
    });
  } catch (err) {
    console.log(`(${process.pid}) Enrolled Service: ${err}`);
    res.status(500).send({
      status: 'ERROR',
      message: err,
    });
  }

  res.status(201).send(enrolled[req.params.id]);
  console.log(`(${process.pid}) Enrolled Service: ${JSON.stringify(enrolled)}`);
});

app.post('/events', async (req, res) => {
  const event = req.body;
  const type = event.type;
  
  console.log(`(${process.pid}) Enrolled Service Received Event: ${type}`);
  if (type === 'StudentCreated') {
    const enrolled = Store.read();
    enrolled[event.data.id] = [];
    Store.write(enrolled);
  }
  
  res.send({});
});

const emitPostCreatedEvent = async (res, id, title) => {};

app.listen(4003, () => {
  console.log(`(${process.pid}) Enrolled Service: Listening on 4003`);
});
