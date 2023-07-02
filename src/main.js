import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { checkFavs, getFavorites } from "./store/favorites";

createApp(App)
    .use(router)
    .provide("favorites", {
        checkFavs,
        getFavorites,
    })
    .mount("#app");
