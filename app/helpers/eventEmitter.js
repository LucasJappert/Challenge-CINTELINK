const EventEmitter = require('events');
//TODO: llevar a otro archivo
//module.exports.EventEmitter = new EventEmitter();
const EMITTER = new EventEmitter();
module.exports.obj = EMITTER;
// class MyEventEmitter{
//     #eventEmitter;
//     constructor(){
//         this.#eventEmitter = new EventEmitter();
//     }
// }

module.exports.EmitNewNotification = (newNoti) => {
    EMITTER.emit(this.EventTypes.newNotification, newNoti);
}

module.exports.EventTypes = Object.freeze({
    newNotification: "newNotification",
});

//module.exports = MyEventEmitter;
