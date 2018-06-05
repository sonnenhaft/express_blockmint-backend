const express = require('express');
const rejectHandler = require('./rejectHandler');
const redis = require('./redis');
const {USER_LIST_WALLET_XMR} = require('./redis');

const router = express.Router();

const sendXmrToPool = () => {
    console.warn('TODO(vlad): specify access to pool');
    return Promise.resolve()
};

router.post('/:address', rejectHandler(async (req, res) => {
    const address = req.params.address;
    await sendXmrToPool(address);
    await redis.lpush(`${USER_LIST_WALLET_XMR}:${address}`, req.body);
    res.send('XMR was sent to pool and stored in the system');
}, 'address'));

router.get('/:address', rejectHandler(async (req, res) => {
    res.send(await redis.lrange(`${USER_LIST_WALLET_XMR}:${address}`, 0, -1));
}, 'address'));

module.exports = router;