import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Steps from "primevue/steps";

import "primevue/resources/themes/saga-orange/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.component("Button", Button);
app.component("Card", Card);
app.component("InputText", InputText);
app.component("Steps", Steps);

app.mount("#app");
