import fs from 'fs';

const read = () => {
  if (fs.existsSync('students.json')) {
    const students = fs.readFileSync('students.json');
    return JSON.parse(students);
  } else {
    return {};
  }
};

const write = (students) => {
  fs.writeFileSync('students.json', JSON.stringify(students));
};

export default {
  read,
  write,
};
