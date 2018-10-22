const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * creates a webpack config to be exported when npm run build in run
 * @param {string} entryPoint The entry points to the application
 * @return {Object} A webpack module for the project
 */
function createWebpackConfigForProject(entryPoint) {
    return {
        entry: entryPoint,
        output: {
            path: path.resolve(__dirname, './dist/pack'),
            filename: '[name]-bundle.js'
        },
        resolve: {
            extensions: ['.js']
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif|otf|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([ { from: './src', to: '..', ignore: ['*.ts', 'app.json'] } ]),
            new CopyWebpackPlugin([
                { 
                    from: './src/app.json', 
                    transform: (content) => {
                        const confString = '' + content;
                        return prepConfig(confString);
                    },
                    to: '..'
                }
            ])
        ]
    };
}

function prepConfig(configString) {
    const deployLocation = process.env.DEPLOY_LOCATION;
    const runtimeVersion = process.env.RUNTIME_VERSION;

    if (deployLocation !== undefined && deployLocation !== '') {
        configString = configString.replace(/http\:\/\/localhost\:9001/g, deployLocation);
    }

    if (runtimeVersion !== undefined && runtimeVersion !== '') {
        const config = JSON.parse(configString);
        config.runtime.version = runtimeVersion;
        configString = JSON.stringify(config, null, 4);
    }
    return configString;
}

/**
 * Modules to be exported
 */
module.exports = [
    createWebpackConfigForProject({'launcher': './staging/src/index.js'})
];
