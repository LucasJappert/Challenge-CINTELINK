module.exports.log = (...params) => {
    params.forEach(log => {
        console.log(log);
    });
}
const hoursDifference = -3;
const auxMiliseconds = hoursDifference * 60 * 60 * 1000;
module.exports.now = () => {
    let now = new Date();
    return now.setTime(now.getTime() + auxMiliseconds);
}
module.exports.DateNow = () => {
    let now = new Date();
    return new Date(now.setTime(now.getTime() + auxMiliseconds));
}
module.exports.ConvertToArgDate = (stringDate) => {
    let aux = new Date(stringDate);
    return new Date(aux.getTime() + auxMiliseconds);
}
