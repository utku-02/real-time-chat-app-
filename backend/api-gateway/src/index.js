const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiGatewayController = require('./controllers/apiGatewayController');
const apiGatewayRoutes = require('./routes/apiGatewayRoutes');
const fetch = require('cross-fetch');

global.fetch = global.fetch || fetch;

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiGatewayRoutes);
app.get('/healthz', apiGatewayController.getHealthz);
app.get('/readiness', apiGatewayController.getReadiness);

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
