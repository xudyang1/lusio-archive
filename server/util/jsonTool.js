exports.nonNullJson = (jsonObj) => {
    const entries = Object.entries(jsonObj);
    const filtered = entries.filter(([key, value]) => value !== null);
    const output = Object.fromEntries(filtered)
    return output
}