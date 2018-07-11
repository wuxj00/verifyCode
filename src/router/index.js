import Vue from 'vue';
import Router from 'vue-router';
import demo from '@/pages/demo';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '',
        name: '门户入口',
        component: demo,
        meta: {
            pageName: '门户索引页面'
        },
    }],
});
