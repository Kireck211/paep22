const fs = require('fs');

const sum = (...args) => [...args].reduce((acc, num) => {
  return acc + num;
}, 0);

const asyncSum = (num1, num2) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(num1 + num2);
  }, 500);
});

const fileHandler = {
  save: (json) => {
    const data = JSON.stringify(json);
    fs.writeFileSync('hello.json', data);
  },
  retrieve: () => {
    const data = fs.readFileSync('hello.json', 'utf8');
    return data;
  }
};

const create = (author = '', name = '') => {
  const song = {author, name};
  // validations
  fileHandler.save(song);
  return song;
};

exports.sum = sum;
exports.asyncSum = asyncSum;
exports.create = create;
exports.fileHandler = fileHandler;