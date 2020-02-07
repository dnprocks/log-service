const Log = require('../models/log');

const createLog = async (req, res) => {
    try {
        const log = await Log.create(req.body);
        return res.send(log);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { createLog };