const path = require('path');
const PrerenderSpaPlugin = require('prerender-spa-plugin');

const productionPlugins = [
    new PrerenderSpaPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: [
            '/blog/',
            '/blog/1/',
            '/blog/2/'
        ],
        server: {
            port: 80,
        },
        renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
            renderAfterElementExists: '#app',
        }),
    })
];

module.exports = {
    lintOnSave: false,
    publicPath: '/',
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(...productionPlugins);
        }
    },
};
