const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const frontAppName = 'sesion24-front'; // taken from package.json name property

app.use(express.static(`./dist/${frontAppName}`));

app.get('*', (req, res) => {
  res.sendFile('index.html', {root: `dist/${frontAppName}`});
});

app.listen(port, () => console.log('Angular ready!!! on port ' + port));
