String.prototype.toDDMMYYYYHHMMSS = function () {
    let result = this;
    try {
        var date = new Date(this);
        result = [
            date.getDate().padLeft(),
            (date.getMonth() + 1).padLeft(),
            date.getFullYear()].join('/') + ' ' +
            [date.getHours().padLeft(),
            date.getMinutes().padLeft(),
            date.getSeconds().padLeft()].join(':');
    } catch (error) {
        console.log(error);
    }
    return result;
}
