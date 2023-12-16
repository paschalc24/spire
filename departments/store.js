import fs from 'fs';

const read = () => {
  if (fs.existsSync('departments.json')) {
    const departments = fs.readFileSync('departments.json');
    return JSON.parse(departments);
  } else {
    return {};
  }
};

const write = (departments) => {
  fs.writeFileSync('departments.json', JSON.stringify(departments));
};

export default {
  read,
  write,
};
