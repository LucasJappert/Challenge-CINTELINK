const colors = require('colors');
module.exports.Red = (...params) => {
    params.forEach(el => {
        console.log(colors.red(el));
    });
}
module.exports.Blue = (...params) => {
    params.forEach(el => {
        console.log(colors.blue(el));
    });
}
module.exports.Green = (...params) => {
    params.forEach(el => {
        console.log(colors.green(el));
    });
}
module.exports.Yellow = (...params) => {
    params.forEach(el => {
        console.log(colors.yellow(el));
    });
}
module.exports.BgGreen = (...params) => {
    params.forEach(el => {
        console.log(colors.bgGreen.black(el));
    });
}
module.exports.BgRed = (...params) => {
    params.forEach(el => {
        console.log(colors.bgRed.black(el));
    });
}
