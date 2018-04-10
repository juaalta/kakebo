const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));
app.use('*', (req, res) => {
  res.redirect('/index.html');
});

app.listen(process.env.PORT || 8080);
