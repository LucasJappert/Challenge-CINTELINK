import * as UserService from "./userService.js";

document.getElementById("GoButton").addEventListener("click", Login, false);

function Login(){
    let username = document.querySelector("#username");
    UserService.Login(username.value);
}
