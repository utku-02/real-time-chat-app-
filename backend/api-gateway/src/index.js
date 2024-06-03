const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiGatewayRoutes = require('./routes/apiGatewayRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiGatewayRoutes);

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
