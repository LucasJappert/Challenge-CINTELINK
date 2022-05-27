module.exports.log = (...params) => {
    params.forEach(log => {
        console.log(log);
    });
}
const hoursDifference = -3;
module.exports.now = () => {
    let now = new Date();
    return now.setTime(now.getTime() + (hoursDifference * 60 * 60 * 1000));
}
module.exports.ConvertToArgDate = (stringDate) => {
    let aux = new Date(stringDate);
    return new Date(aux.getTime() + (hoursDifference * 60 * 60 * 1000));
}
