//Internal Imports
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

//External Imports
const express = require('express');
const socketIo = require('socket.io');

//custom Imports
const config = require('./configuration');

let app = express();

let server;

let io;


if(config.get('env') === 'production'){

    // const options = {
    //     key: fs.readFileSync(path.join(__dirname, `../../${config.get('server.https.privateKey')}`)),
    //     cert: fs.readFileSync(path.join(__dirname, `../../${config.get('server.https.certificate')}`))
    // };

    //create https server
    server = http.createServer(app);
} else {

    //create http server
    server = http.createServer(app);
}

io = socketIo.listen(server);

//socket.io
require('./socket.io')(io);

//middlewares
require('./middlewares')(app, express, __dirname);

//routers
require('./routers')(app);

app.get('/',(req, res) =>{
    res.sendFile(path.join(__dirname, '/views/index.html'));
})

app.set('port', config.get('server.http.port'));

server.listen(app.get('port'), ()=>{
    console.info(`Express server start on port: ${app.get('port')} with PROCESSID ${process.id}`);
    console.info(`Environment: ${config.get('env')}`);
});

module.exports = app;