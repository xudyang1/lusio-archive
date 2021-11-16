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
 * @param {Array<String> | String} drop key or list of keys in string
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
 * @param {Array<String> | String} entries select entries with keys in the array
 * @returns a new JSON with entries with keys provided by the array if present
 */
exports.selectEntries = (jsonObj, entries) => {
    jsonObj = JSON.parse(JSON.stringify(jsonObj));
    const filtered = Object.entries(jsonObj).filter(([key, value]) => entries.includes(key));
    return Object.fromEntries(filtered);
}