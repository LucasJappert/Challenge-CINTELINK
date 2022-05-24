const API_URL = "http://localhost:2000/api";
const KEY_USER_STORAGE = "UserCintelink";

const Login = async (userName) => {
    const user = {
        Nick: userName
    }
    const encabezado = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }
    await fetch(`${API_URL}/users`, encabezado)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        localStorage.setItem(KEY_USER_STORAGE, JSON.stringify(json));
        window.location = "./index.html";
    })
    .catch(error => console.log(error));
};
export { Login, KEY_USER_STORAGE };

// JSON.parse(localStorage.getItem(key));
