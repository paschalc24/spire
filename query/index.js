import express from 'express';
import cors from 'cors';
import Store from './store.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/students/:id', (req, res) => {
  const students = Store.read();
  res.send(students[req.params.id]);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  const students = Store.read();
  if (type === 'StudentCreated') {
    const {
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
    } = data;
    console.log(`${process.pid} Query Service: StudentCreated ${id}`)
    
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
      track: {},
      cart: [],
      enrolled: [],
    };
  }
  if (type === 'StudentDepartmentsInitialized') {
    const {
      id,
      student_track,
    } = data;
    console.log(`${process.pid} Query Service: StudentDepartmentsInitialized ${id}`)
    students[id].track = student_track;
  }
  if (type === 'CartEntryDeleted') {
    const {
      id,
      courseId
    } = data;
    students[id].cart = students[id].cart.filter( e => e !== courseId);
  }
  if (type === 'EnrolledEntryDeleted') {
    const {
      id,
      courseId
    } = data;
    students[id].enrolled = students[id].enrolled.filter( e => e !== courseId);
  }
  if (type === 'CartEntryCreated') {
    const {
      id, 
      courseId
    } = data;
    students[id].cart.push(courseId);
  }
  if (type === 'EnrolledEntryCreated') {
    const {
      id, 
      courseId
    } = data;
    console.log("CART DATA", data)
    students[id].cart = students[id].cart.filter(e => e !== courseId);
    students[id].enrolled.push(courseId);
  }
  

  Store.write(students);

  res.send({ status: 'OK' });
});

app.listen(4004, () => {
  console.log('Query Service Listening on 4004');
});
