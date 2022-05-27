module.exports.log = (...params) => {
    params.forEach(log => {
        console.log(log);
    });
}
