import fs from 'fs';

const read = () => {
  if (fs.existsSync('enrolled.json')) {
    const carts = fs.readFileSync('enrolled.json');
    return JSON.parse(carts);
  } else {
    return {};
  }
};

const write = (carts) => {
  fs.writeFileSync('enrolled.json', JSON.stringify(carts));
};

export default {
  read,
  write,
};
