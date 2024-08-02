import { createApp } from "vue";
import App from "./App.vue";
import Icon from "@loong/components/icon/index";

const app = createApp(App);

const plugins = [Icon];

plugins.forEach((plugin) => {
  app.use(plugin);
});

app.mount("#app");
