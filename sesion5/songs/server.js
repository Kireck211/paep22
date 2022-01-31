const express = require('express');

const songsRouter = require('./routes/songs');

const app = express();
const port = process.env.PORT || 3000;

// 1. get all songs (import them using require)

app.use(express.json());

app.use('/songs', songsRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));