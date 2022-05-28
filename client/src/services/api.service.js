const axios = require('axios');
export default {
    async Login(userName) {
        let result = null;
        result = await axios.post(`${process.env.VUE_APP_API_URL}/users`, { Nick: userName })
        .then(response => {
            return response.data;
        })
        .catch(error => console.log(error));
        return result;
    },
    //ADMIN
    async GetAllNotifications() {
        let result = null;
        result = await axios.get(`${process.env.VUE_APP_API_URL}/notifications`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
        return result;
    },
    async GetTags() {
        let result = null;
        result = await axios.get(`${process.env.VUE_APP_API_URL}/tags`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
        return result;
    },
    async GetMyTags(userId) {
        let result = null;
        result = await axios.get(`${process.env.VUE_APP_API_URL}/tags/user/${userId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
        return result;
    },
    async UpdateSubscriptionTag(userId, tagId) {
        let result = null;
        result = await axios.post(`${process.env.VUE_APP_API_URL}/tag/${tagId}/user/${userId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
        return result;
    },
    async CreateNotification(newNotification) {
        let result = null;
        result = await axios.post(`${process.env.VUE_APP_API_URL}/notification`, newNotification)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
        return result;
    },
    async DeleteNotification(idNotification) {
        let result = null;
        result = await axios.delete(`${process.env.VUE_APP_API_URL}/notification/${idNotification}`)
        .then(response => {
            if(response.status == 200) return true;

            return false;
        })
        .catch(error => {
            console.error(error);
        });
        return result;
    },

    //USER
    async GetNotifications(userId) {
        let result = [];
        result = await axios.get(`${process.env.VUE_APP_API_URL}/notifications/user/${userId}/sent`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
        return result;
    },
    async DeleteNotificationUserAsync(idNotiUser) {
        let result = null;
        result = await axios.delete(`${process.env.VUE_APP_API_URL}/notification/user/${idNotiUser}`)
        .then(response => {
            if(response.status == 200) return true;

            return false;
        })
        .catch(error => {
            console.error(error);
        });
        return result;
    },

}
