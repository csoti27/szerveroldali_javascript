/**
 * param templateName (string)
 * A megadott template szerint megjeleníti az átadott adatokat
 */

const requireOption = require('./requireOption');

module.exports = function (objectrepository, viewName) {
    return function (req, res) {
        console.log(viewName);
        res.render(viewName);
    };
};