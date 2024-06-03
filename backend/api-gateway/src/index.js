const express = require('express');
const bodyParser = require('body-parser');
const apiGatewayRoutes = require('./routes/apiGatewayRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', apiGatewayRoutes);

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
