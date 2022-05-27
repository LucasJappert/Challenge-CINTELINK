<template>
    <div>
        <div class="background">
            <div class="shape"></div>
            <div class="shape"></div>
        </div>
        <div class="containerform">
            <h3>Login / Register</h3>

            <label for="username">Username</label>
            <input type="text" v-model.trim="username" ref="username" @keyup.enter="TryLoginAsync()" />

            <button id="GoButton" @click="TryLoginAsync()">Go!</button>
        </div>
    </div>
</template>

<script>
import api from '../services/api.service';
export default {
    data() {
        return {
            username: "",
        };
    },
    mounted() {
        this.ClearLoggerUser();
        this.$refs.username.focus();
    },
    methods: {
        async TryLoginAsync() {
            if (this.username.length <= 2) {
                alert("Nombre inválido!");
                return;
            }
            let user = await api.Login(this.username);
            if (user == null) return;

            this.loggedUser = user;
            localStorage.setItem(process.env.VUE_APP_KEY_USER_STORAGE, JSON.stringify(user));

            if (user.Rol == 99) {
                this.$router.push({ name: "Admin" });
            }
            else if (user.Rol == 0) {
                this.$router.push({ name: "User" });
            }
        },
    },
};
</script>

<style scoped>
*,
*:before,
*:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.background {
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
}

.background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
}

.shape:first-child {
    background: linear-gradient(#1845ad, #23a2f6);
    left: -80px;
    top: -80px;
}

.shape:last-child {
    background: linear-gradient(to right, #ff512f, #f09819);
    right: -30px;
    bottom: -80px;
}

.containerform {
    height: 450px;
    width: 400px;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
    color: #ffffff;
}

.containerform * {
    font-family: "Poppins", sans-serif;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
    font-size: 1.2em;
}

.containerform h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
}

label {
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}

input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-weight: 300;
    color: #fff;
}

::placeholder {
    color: #e5e5e5;
}

.social {
    margin-top: 30px;
    display: flex;
}

.social div {
    background: red;
    width: 150px;
    border-radius: 3px;
    padding: 5px 10px 10px 5px;
    background-color: rgba(255, 255, 255, 0.27);
    color: #eaf0fb;
    text-align: center;
}

.social div:hover {
    background-color: rgba(255, 255, 255, 0.47);
}

.social .fb {
    margin-left: 25px;
}

.social i {
    margin-right: 4px;
}

button {
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
}
</style>
