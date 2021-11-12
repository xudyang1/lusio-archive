/**
 * @param {Json} jsonObj
 * @returns a new Json with non null entries of {jsonObj}
 */
exports.nonNullJson = (jsonObj) => {
    jsonObj = JSON.parse(JSON.stringify(jsonObj));
    const filtered = Object.entries(jsonObj).filter(([key, value]) => value !== null);
    return Object.fromEntries(filtered);
};
/**
 * 
 * @param {Json} jsonObj 
 * @param {Array<string> | string} drop key or list of keys in string
 * @returns a new Json after filtering out {drop} entries of {jsonObj}
 */
exports.dropEntries = (jsonObj, drop) => {
    jsonObj = JSON.parse(JSON.stringify(jsonObj));
    const filtered = Object.entries(jsonObj).filter(([key, value]) => !(drop.includes(key)));
    return Object.fromEntries(filtered);
};

exports.selectEntries = (jsonObj, entries) => {
    jsonObj = JSON.parse(JSON.stringify(jsonObj));
    const filtered = Object.entries(jsonObj).filter(([key, value]) => entries.includes(key));
    return Object.fromEntries(filtered);
}