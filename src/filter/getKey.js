import Vue from 'vue';

Vue.filter('getKey', (val, key) => {
    if (val instanceof Object) {
        return val[key];
    }
    return null;
});
