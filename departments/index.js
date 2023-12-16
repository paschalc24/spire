import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { randomBytes } from 'crypto';
import Store from './store.js';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.get('/department/:id', (req, res) => {
  console.log(`(${process.pid}) Departments Service: GET BY ID/department/${req.params.id}`);
  const departments = Store.read();
  const id = req.params.id;
  if (departments[id] === undefined) {
    res.status(404).end();
  }
  else {
    const department = departments[id];
    console.log(`(${process.pid}) Students Service: ${JSON.stringify(department)}`);
    res.status(200).send(department);
  }
});

app.get('/departments', (req, res) => {
  console.log(`(${process.pid}) Departments Service: GET /departments`);
  const departments = Store.read();
  console.log(`(${process.pid}) Departments Service: ${JSON.stringify(departments)}`);
  res.send(departments);
});

app.post('/departments', async (req, res) => {
  const {
    id,
    title, 
    track,
  } = req.body;

  const departments = Store.read();
  console.log(`(${process.pid}) Departments Service: ${JSON.stringify(departments)}`);

  departments[id] = {title:title, track:track};
  
  Store.write(departments);

  try {
    await fetch('http://localhost:4005/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'DepartmentCreated',
        data: {
          id,
          title, 
          track,
        },
      }),
    });
  } catch (err) {
    console.log(`(${process.pid}) Departments Service: ${err}`);
    res.status(500).send({
      status: 'ERROR',
      message: err,
    });
  }

  res.status(201).send(departments[id]);
  console.log(`(${process.pid}) Departments Service: ${JSON.stringify(departments)}`);
});

app.post('/events', async (req, res) => {
  const event = req.body;
  const type = event.type;
  console.log(`(${process.pid}) Departments Service Received Event: ${type}`);
  res.send({});
});

const emitPostCreatedEvent = async (res, id, title) => {};

app.listen(4001, () => {
  console.log(`(${process.pid}) Departments Service: Listening on 4001`);
});
