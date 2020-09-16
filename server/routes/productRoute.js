const express = require('express');
const fs = require('fs');
const data = require('../data');
const uniqid = require('uniqid');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        if (req.query.productId) {
            const id = req.query.productId;
            const product = await data.find(i => i.id === id);
            return res.send(product);
        }
        const sortType = req.query.sortBy;
        const sortedData = await sortData(data, sortType)
        return res.send(sortedData);
    } catch(error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const newProduct = {
        'id': uniqid(),
        'name': req.body.name,
        'price': +req.body.price,
        'available': +req.body.available
    };
    const updatedData = [...data, newProduct];
    const newData = await JSON.stringify(updatedData, null, 3);
    try {
        await fs.writeFileSync(__dirname + '/../data.json', newData);
    } catch(error) {
        next(error);
    }
    res.send(newProduct);
});

const sortData = (array, sortingType) => {
    switch (sortingType) {
        case 'name':
            return array.sort((a, b) => a.name.localeCompare(b.name));
        case 'price':
            return array.sort((a, b) => a.price - b.price);
        case 'availability':
            return array.sort((a, b) => b.available - a.available);
        default:
            return array.sort((a, b) => a.id.localeCompare(b.id));
    }
};

module.exports = router;