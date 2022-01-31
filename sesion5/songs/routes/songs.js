const router = require('express').Router();

const songs = require('../songs.json');
// path /songs

// 2. Obtain all songs with the route /songs
router.get('/', (req, res) => {
  res.send(songs);
});

// 3. Obtain only one song
// Obtain the song index from the url as parameter
// Save the index in a variable called index
router.get('/:index', (req, res) => {
  const { params: { index } } = req;
  res.send(songs[index]);
});

// 4. Save a new song based on the body sent to the route 
router.post('/', (req, res) => {
  const {body} = req;
  songs.push(body);
  res.send(songs);
});

// 5. Remove a song based on the index
router.delete('/:index', (req, res) => {
  const { params: { index } } = req;
  songs.splice(index, 1);
  res.send(songs);
});

module.exports = router;