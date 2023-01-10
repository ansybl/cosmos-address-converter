const webpack = require('webpack');

/**
 * NodeJS polyfills are not included in the latest version of create-react-app 5, refs:
 * - https://github.com/cosmos/cosmjs/tree/v0.29.5#webpack-configs
 * - https://github.com/web3/web3.js/tree/v1.8.1#web3-and-create-react-app
 */
module.exports = function override(config) {
    config.resolve.fallback = {
        buffer: false,
        crypto: false,
        events: false,
        path: false,
        stream: false,
        string_decoder: false,
    }
    config.ignoreWarnings = [/Failed to parse source map/];
    return config
}
