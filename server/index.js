const express = require('express');
const bodyParser = require('body-parser');

const productRoute = require('./routes/productRoute');

const app = express();

app.use(bodyParser.json());

app.use('/api/products', productRoute);

app.use((err, req, res) => {
  if (res.headersSent) {
    return res.end();
  };
  res.status(err.status || 500).send(err.message);
});

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});