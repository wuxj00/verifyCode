'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASER_URL: '"http://192.168.100.160:8801/api"'
    // BASER_URL: '"proxy"',
    BASER_URL: '"http://192.168.100.160:8801/api"',
});
