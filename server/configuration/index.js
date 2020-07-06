//External Imports
const convict = require('convict');

const config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    // ip: {
    //     doc: "The IP address to bind.",
    //     format: "ipaddress",
    //     default: "127.0.0.1",
    //     env: "IP_ADDRESS",
    // },
    server: {
        enableHttpsServer: {
            doc: 'Enable https server',
            format: Boolean,
            default: false
        },
        http: {
            port: {
                doc: "Http port to bind.",
                format: Number,
                default: 3003
            }
        },
        https: {
            port: {
                doc: "Http port to bind.",
                format: Number,
                default: 3003,
                env: 'HTTPSPORT'
            },
            privateKey: {
                doc: 'Private key file name',
                format: String,
                default: 'ssl.key'
            },
            certificate: {
                doc: 'Certificate file name',
                format: String,
                default: 'ssl.cert'
            }
        },
        security: {
            enableApiKey: {
                doc: 'Enable api Key security.',
                format: Boolean,
                default: false
            },
            validationApiKey: {
                doc: 'Api key for security.',
                format: String,
                default: 'df7d-dys3-hg65-87u7-ud56-j87u-98yu'
            },
            enableCORS: {
                doc: 'Enable cors for security.',
                format: Boolean,
                default: false
            }
        },
        enableStatic: {
            doc: 'Enable static for path.',
            format: Boolean,
            default: true
        },
        static: {
            directory: {
                doc: 'Static path for directory.',
                format: String,
                default: '../public/uploads/'
            }
        },
        bodyParser: {
            limit: {
                doc: 'maximum request body size',
                format: String,
                default: '100mb'
            }
        }
    },
    baseUrl: {
        doc: 'Base url for ip.',
        format: String,
        default: 'http://192.168.225.52:3002/'
    },
    multer: {
        uploadDirectoryPath: {
            doc: "Multer upload directory path",
            format: String,
            default: "./public/uploads/"

        }
    }
});

// // Load environment dependent configuration
// let env = config.get('env');

module.exports = config;