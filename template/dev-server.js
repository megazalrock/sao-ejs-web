const express = require('express');
const config = require('./build/config');

const app = express();

app.use(express.static(config.distDir));

const listener = app.listen(config.port, config.host, () => {
  console.log(`Express server on http://${listener.address().address}:${listener.address().port}`);
});
