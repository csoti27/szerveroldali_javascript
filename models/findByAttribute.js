/**
 * Kisegítő függvény a novenyhez rendelt botanikus kikereséséhez
 */
const Schema = require('mongoose').Schema;
const db = require('../config/db');

const findByAttribute = async function findByAttribute(model, attribute, value) {
    const query = {};
    query[attribute] = value;
    return model.findOne(query);
}

module.exports = findByAttribute;