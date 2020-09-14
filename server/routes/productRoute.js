const express = require('express');
const data = require('../data');

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.productId) {
        const id = req.query.productId;
        const product = data.find(i => i.id === id);
        return res.send(product);
    }
    return res.send(data);
});

module.exports = router;