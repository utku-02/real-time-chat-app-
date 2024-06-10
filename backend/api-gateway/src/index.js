const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiGatewayRoutes = require('./routes/apiGatewayRoutes');
const fetch = require('cross-fetch');

global.fetch = global.fetch || fetch;

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiGatewayRoutes);
app.get('/healthz', userController.getHealthz);
app.get('/readiness', userController.getReadiness);

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
