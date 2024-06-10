const axios = require('axios');

exports.getHealthz = async (req, res) => {
    res.status(200).send('OK');
};

exports.getReadiness = async (req, res) => {
    try { 
        await axios.get('http://auth-service:3004/healthz'); 
        console.log('auth service is ready.');
    } catch (err) { 
        console.error('auth service not ready:', err.message);
        res.status(500).json({ error: err.message }); 
    }
    
    try { 
        await axios.get('http://chat-service:3002/healthz'); 
        console.log('chat service is ready.');
    } catch (err) { 
        console.error('chat service not ready:', err.message);
        res.status(500).json({ error: err.message }); 
    }
    
    try { 
        await axios.get('http://message-service:3003/healthz'); 
        console.log('message service is ready.');
    } catch (err) { 
        console.error('message service not ready:', err.message);
        res.status(500).json({ error: err.message }); 
    }
    
    try { 
        await axios.get('http://user-service:3001/healthz'); 
        console.log('user service is ready.');
    } catch (err) { 
        console.error('user service not ready:', err.message);
        res.status(500).json({ error: err.message }); 
    }

    res.status(200).json('OK');
};
