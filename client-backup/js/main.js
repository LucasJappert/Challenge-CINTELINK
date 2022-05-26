import * as UserService from "./userService.js";

let ClientSocket;
let myNotifications = {};

String.prototype.toDDMMYYYYHHMMSS = function () {
    let result = this;
    try {
        var date = new Date(this);
        result = [
            `0${date.getDate()}`.slice(-2),
            `0${date.getMonth() + 1}`.slice(-2),
            date.getFullYear()].join('/') + ' ' +
            [`0${date.getHours()}`.slice(-2),
            `0${date.getMinutes() + 1}`.slice(-2),
            `0${date.getSeconds() + 1}`.slice(-2)].join(':');
    } catch (error) {
        console.log(error);
    }
    return result;
}

//#region Socket EVENTS (Socket connection only start if there's a logged user)
let loggedUser = JSON.parse(localStorage.getItem(UserService.KEY_USER_STORAGE));
if (loggedUser != null){
    ClientSocket = io();
    ClientSocket.on("message", (data) => {
        console.log(data);
        if (data.notifications != null){
            myNotifications = data.notifications;
            ResetMenuNotificationsListHTML();
            console.log(GetOrderedNotifications());
        }
        if (data.newNotification != null){
            myNotifications[data.newNotification.Id] = data.newNotification;
            ResetMenuNotificationsListHTML();
            ClientSocket.emit("message", {
                message: `Notificación ${data.newNotification.Id} recibida/actualizada!`
            });
        }
    });

    function ChangeNotificationMark(notificationId){
        console.log(notificationId);
        ClientSocket.emit("message", {
            updateReadingDateNotificationId: notificationId
        });
    }

    setTimeout(() => {
        ClientSocket.emit("message", `Hola! soy el cliente: ${ClientSocket.id}`);
    }, 1000);
}
//#endregion ###########################################################################

//#region DOM Functions
function SetNotificationsSection(){
    Object.values(myNotifications).forEach(noti => {
        AddNewMenuNotificationHTML(noti);
    });
    SetAmountOfUnreadNotificationsHTML();
}
function GetOrderedNotifications(){
    return Object.values(myNotifications).sort().reverse();
}
//#endregion ###########################################################################

//TODO: Ver error que io no está definido, lo larga a veces

//#region DOM Rendering
function ResetMenuNotificationsListHTML(){
    let notificationsList = document.querySelector(".notificationsList");
    notificationsList.innerHTML = `<div onclick="ShowAllNotificationsHTML()" class="seeAll">Ver todas</div>`;

    GetOrderedNotifications().forEach(noti => {
        AddNewMenuNotificationHTML(noti);
    });
}
function AddNewMenuNotificationHTML(notification){
    let notificationsList = document.querySelector(".notificationsList");
    notificationsList.innerHTML += `
        <div class="sec">
            <div onclick="ChangeNotificationMark(${notification.Id})" class="readNotificacionMark ${notification.ReadingDate !=null ? 'read' : ''}"></div>
            <div class="txt">${notification.Message}</div>
            <div class="txt sub">${new Date(notification.CreationDate).toLocaleDateString('en-GB')}</div>
        </div>
    `;
    SetAmountOfUnreadNotificationsHTML();
}
function SetAmountOfUnreadNotificationsHTML(){
    let unreadNotifications = document.querySelector(".unreadNotifications");
    unreadNotifications.innerHTML = Object.keys(myNotifications).length;
}

function ShowAllNotificationsHTML () {
    SetContainerAllNotificationsHTML();
    let containerAllNotifications = document.querySelector(".containerAllNotifications");
    containerAllNotifications.classList.add("dBlock");
}
function SetContainerAllNotificationsHTML(){
    let containerAllNotifications = document.querySelector(".containerAllNotifications");
    containerAllNotifications.innerHTML = `
        <div class="row header">
            <div>#</div>
            <div>Mensaje</div>
            <div>IdTag</div>
            <div>Fecha recepción</div>
            <div></div>
        </div>
    `;
    GetOrderedNotifications().forEach(noti => {
        containerAllNotifications.innerHTML += `
            <div class="row">
                <div>${noti.Id}</div>
                <div>${noti.Message}</div>
                <div>${noti.IdTag}</div>
                <div>${noti.SentDate.toDDMMYYYYHHMMSS()}</div>
                <div class="aliCenter"><i class="fa fa-trash"></i></div>
            </div>
        `;
    });
}
//#endregion ###########################################################################


