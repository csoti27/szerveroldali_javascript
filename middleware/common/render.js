/**
 * param templateName (string)
 * A megadott template szerint megjeleníti az átadott adatokat
 */

module.exports = function (objectrepository, viewName) {
    return function (req, res) {
        res.render(viewName);
    };
};