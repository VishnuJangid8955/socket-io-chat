//External Imports
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

//Custom Imports
const config = require('../configuration');


module.exports = (app, express, root) =>{
    //To Api key validation
    if(config.get('server.security.enableApiKey')){
        require('./validateApiKey')(app);
    };

    // Enable Static Directory Path
    if (config.get('server.enableStatic')) {
        app.use(express.static(path.join(root, config.get('server.static.directory'))));
    }

    // Enable CORS support
    if (config.get('server.security.enableCORS'))
        app.use(cors());

    //Enable request body parsing 
    app.use(bodyParser.urlencoded({
        extended: false,
        limit: config.get('server.bodyParser.limit')
    }));

    // Enable request body parsing in JSON format
    app.use(bodyParser.json({
        limit: config.get('server.bodyParser.limit')
    }));


}