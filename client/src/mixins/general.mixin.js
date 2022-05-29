export default {
    data(){
        return{
            loggedUser: null,
            showAllNotifications: true,
            // myNotifications:[],
            // showAllNotifications: true,
        }
    },
    created(){
        this.loggedUser = this.GetLoggedUser();
        //console.log(2222);
    },
    mounted(){
        // if (this.loggedUser == null) {
        //     this.$router.push({ name: "Login" });
        //     return;
        // }
    },
    methods:{
        GetLoggedUser() {
            return JSON.parse(localStorage.getItem(process.env.VUE_APP_KEY_USER_STORAGE));
        },
        ClearLoggerUser() {
            localStorage.removeItem(process.env.VUE_APP_KEY_USER_STORAGE);
        }
    },
    computed: {
        getUserId(){
            return this.loggedUser.Id;
        },
        getNickName(){
            return this.loggedUser.Nick;
        },
        rolAdmin(){
            if (this.loggedUser == null) return false;
            return this.loggedUser.Rol == 99;
        },
        getNickName(){
            return this.GetLoggedUser().Nick;
        },
    },
}
