const axios = require('axios');
export default {
    methods:{
        async Login(userName) {
            await axios.post(`${process.env.VUE_APP_API_URL}/users`, { Nick: userName })
            .then(response => {
                localStorage.setItem(process.env.VUE_APP_KEY_USER_STORAGE, JSON.stringify(response.data));
                this.$router.push({ name: "Home" });
            })
            .catch(error => console.log(error));
        },
        GetLoggedUser() {
            return JSON.parse(localStorage.getItem(process.env.VUE_APP_KEY_USER_STORAGE));
        },
        ClearLoggerUser() {
            localStorage.removeItem(process.env.VUE_APP_KEY_USER_STORAGE);
        }
    }
}
