const express = require('express');
const fs = require('fs');
const data = require('../data');
const uniqid = require('uniqid');

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.productId) {
        const id = req.query.productId;
        const product = data.find(i => i.id === id);
        return res.send(product);
    }
    const sortType = req.query.sortBy;
    return res.send(sortData(data, sortType));
});

router.post('/', (req, res) => {
    const test = {
        'id': uniqid(),
        'name': req.body.name,
        'price': +req.body.price,
        'available': +req.body.available
    };
    const updatedData = [...data, test];
    const newData = JSON.stringify(updatedData, null, 3);
    try {
        fs.writeFileSync(__dirname + '/../data.json', newData);
    } catch(error) {
        console.log(error);
    }
    res.end();
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