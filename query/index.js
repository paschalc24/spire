import express from 'express';
import cors from 'cors';
import Store from './store.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/students', (req, res) => {
  const students = Store.read();
  res.send(students);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  const students = Store.read();
  if (type === 'StudentCreated') {
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
      coursesTaken
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
      departments: [],
      cart: [],
      enrolled: [],
    };
  }

  if (type === 'DepartmentCreated') {
    const {
      id,
      title, 
      track,
    } = data;
    console.log(`post id = ${postId}`);
    const student = students[id];
    console.log(`${process.pid} Query Service: DepartmentCreated ${id}`);
    student.departments.push({ id, track, title });
  }
  // Cart Updated
  // if (type === 'DepartmentCreated') {
  //   const {
  //     id,
  //     title, 
  //     track,
  //   } = data;
  //   console.log(`post id = ${postId}`);
  //   const student = students[id];
  //   console.log(`${process.pid} Query Service: DepartmentCreated ${id}`);
  //   student.departments.push({ id, track, title });
  // }
  // Enrolled Updated
  // if (type === 'DepartmentCreated') {
  //   const {
  //     id,
  //     title, 
  //     track,
  //   } = data;
  //   console.log(`post id = ${postId}`);
  //   const student = students[id];
  //   console.log(`${process.pid} Query Service: DepartmentCreated ${id}`);
  //   student.departments.push({ id, track, title });
  // }
  Store.write(posts);

  res.send({ status: 'OK' });
});

app.listen(4003, () => {
  console.log('Query Service Listening on 4003');
});
