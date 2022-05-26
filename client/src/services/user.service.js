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
        async GetNotifications(userId) {
            let result = await axios.get(`${process.env.VUE_APP_API_URL}/notifications/user/${userId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error(error);
                return null;
            });
            return result;
        },
        // async UpdateNotification(noti){
        //     const data = {
        //         IdNotification: notiId,
        //         ReadingDate: req.body.ReadingDate,
        //         CanceledDate: req.body.CanceledDate
        //     };
        //     let result = await axios.get(`${process.env.VUE_APP_API_URL}/notifications/user/${userId}`)
        //     .then(response => {
        //         console.log(response.data);
        //         return response.data;
        //     })
        //     .catch(error => {
        //         console.error(error);
        //         return null;
        //     });
        //     return result;
        // },
        GetLoggedUser() {
            return JSON.parse(localStorage.getItem(process.env.VUE_APP_KEY_USER_STORAGE));
        },
        ClearLoggerUser() {
            localStorage.removeItem(process.env.VUE_APP_KEY_USER_STORAGE);
        }
    }
}
