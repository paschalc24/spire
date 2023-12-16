import fs from 'fs';

const read = () => {
  if (fs.existsSync('carts.json')) {
    const carts = fs.readFileSync('carts.json');
    return JSON.parse(carts);
  } else {
    return {};
  }
};

const write = (carts) => {
  fs.writeFileSync('carts.json', JSON.stringify(carts));
};

export default {
  read,
  write,
};
