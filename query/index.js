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
    console.log("STUDENTS", students)
    console.log("STUDENT", students[id])
    console.log("STUDENT ID TRACK BEFORE INIT", students[id].track)
    students[id].track = student_track;
    console.log("STUDENTS UPDATED", students)
  }
  console.log("WRITING STUDENTS", students);
  Store.write(students);

  res.send({ status: 'OK' });
});

app.listen(4004, () => {
  console.log('Query Service Listening on 4004');
});
