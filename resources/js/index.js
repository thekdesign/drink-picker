import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {boot} from 'bootstrap';
import App from 'components/App.vue';
import {router} from 'router';
import 'sass/base/_bootstrap.scss';

(async () => {
    const pinia = createPinia();
    await boot({pinia});

    createApp(App)
        .use(pinia)
        .use(router)
        .mount('#app');
})();
