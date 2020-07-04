

module.exports = (app)=>{

    app.use('/socket', require('../api/socket.io'));

}