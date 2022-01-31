const fs = require('fs');

const sum = (...args) => [...args].reduce((acc, value) => {
  return acc + value;
}, 0);

const asyncSum = (num1, num2) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(num1 + num2);
  }, 20);
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
  try {
    fileHandler.save(song);
  } catch (err) {
    // manage error
  }
  return song;
};

exports.sum = sum;
exports.asyncSum = asyncSum;
exports.create = create;
exports.fileHandler = fileHandler;