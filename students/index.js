import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import Store from './store.js';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.get('/student/:id', (req, res) => {
  console.log(`(${process.pid}) Students Service: GET BY ID/students/${req.params.id}`);
  const students = Store.read();
  const id = req.params.id;
  if (students[id] === undefined) {
    res.status(404).end();
  }
  else {
    const student = students[id];
    console.log(`(${process.pid}) Students Service: ${JSON.stringify(student)}`);
    res.status(200).send(student);
  }
});

app.post('/students', async (req, res) => {
  // Spire ID:
  const {
    id,
    firstName, 
    lastName,
    departments,
    gpa,
    major_gpa,
    academic_year,
    advisor,
    standing,
    credits,
    expected_grad,
    coursesTaken,
  } = req.body;

  const students = Store.read();
  console.log(`(${process.pid}) Students Service: ${JSON.stringify(students)}`);

  students[id] = {
    id,
    firstName, 
    lastName,
    gpa,
    major_gpa,
    academic_year,
    advisor,
    standing,
    credits,
    expected_grad,
    coursesTaken,
    departments,
  };
  Store.write(students);

  try {
    await fetch('http://localhost:4005/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'StudentCreated',
        data: {
          id,
          firstName, 
          lastName,
          gpa,
          major_gpa,
          academic_year,
          advisor,
          standing,
          credits,
          expected_grad,
          coursesTaken,
          departments,
        },
      }),
    });
  } catch (err) {
    console.log(`(${process.pid}) Students Service: ${err}`);
    res.status(500).send({
      status: 'ERROR',
      message: err,
    });
  }

  res.status(201).send(students[id]);
  console.log(`(${process.pid}) Students Service: ${JSON.stringify(students)}`);
});

app.post('/events', async (req, res) => {
  const event = req.body;
  const type = event.type;
  console.log(`(${process.pid}) Students Service Received Event: ${type}`);
  res.send({});
});

const emitPostCreatedEvent = async (res, id, title) => {};

app.listen(4000, () => {
  console.log(`(${process.pid}) Students Service: Listening on 4000`);
});
