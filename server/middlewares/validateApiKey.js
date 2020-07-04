//Custom Imports
const constants = require('../utils/constant');
const config = require('../configuration');

module.exports = (app)=>{
    app.use((req, res, next) =>{

        let apiKey = req.header('x-api-key');

        if(apiKey){

            if(apiKey === config.get('server.security.validationApiKey')){

                next();

            } else {

                res.status(500).json({
                    error: true,
                    code: constants.UNAUTHORIZED.code,
                    message: 'Invalid api key.',
                    data: null
                })
            }
        }else {

            res.status(500).json({
                error: true,
                code: constants.UNAUTHORIZED.code,
                message: 'Access denied. No api key provided.',
                data: null
            })
        }
    })
}