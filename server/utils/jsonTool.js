/**
 * @param {JSON} jsonObj
 * @returns a new JSON with non null entries of {jsonObj}
 */
exports.nonNullJson = (jsonObj) => {
    jsonObj = JSON.parse(JSON.stringify(jsonObj));
    const filtered = Object.entries(jsonObj).filter(([key, value]) => value !== null);
    return Object.fromEntries(filtered);
};
/**
 * 
 * @param {JSON} jsonObj 
 * @param {Array<string> | string} drop key or list of keys in string
 * @returns a new JSON after filtering out {drop} entries of {jsonObj}
 */
exports.dropEntries = (jsonObj, drop) => {
    jsonObj = JSON.parse(JSON.stringify(jsonObj));
    const filtered = Object.entries(jsonObj).filter(([key, value]) => !(drop.includes(key)));
    return Object.fromEntries(filtered);
};
/**
 * 
 * @param {JSON} jsonObj 
 * @param {Array<string> | string} entries select entries with keys in the array
 * @returns a new JSON with entries with keys provided by the array if present
 */
exports.selectEntries = (jsonObj, entries) => {
    jsonObj = JSON.parse(JSON.stringify(jsonObj));
    const filtered = Object.entries(jsonObj).filter(([key, value]) => entries.includes(key));
    return Object.fromEntries(filtered);
};
/**
 * 
 * @param {EventHandler} res response event handler
 * @param {number} statusCode HTTP status code, default with 400
 * @param {string | Array<string>} msg error message, default with 'Bad Request, cannot process'
 * @returns send response indicates the error with error status code and error message
 */
exports.errorHandler = (res, statusCode = 400, msg = 'Bad Request, cannot process') => {
    return res.status(statusCode).json({
        success: false,
        msg: msg
    });
};