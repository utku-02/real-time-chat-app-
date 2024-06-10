const apiGatewayService = require('../services/apiGatewayService');

exports.getHealthz = async (req, res) => {
    res.status(200).send('OK');
};

exports.getReadiness = async (req, res) => {
    try { await axios.get('http://auth-service:3004/healthz'); } 
    catch (err) { res.status(500).json({ error: err.message }); }
    
    try { await axios.get('http://chat-service:3002/healthz'); } 
    catch (err) { res.status(500).json({ error: err.message }); }
    
    try { await axios.get('http://message-service:3003/healthz'); } 
    catch (err) { res.status(500).json({ error: err.message }); }
    
    try { await axios.get('http://user-service:3001/healthz'); } 
    catch (err) { res.status(500).json({ error: err.message }); }

    res.status(200).json('OK');
};
