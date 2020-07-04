//Internal Imports
const fs = require('fs');
const http = require('http');
const https = require('https');

//External Imports
const express = require('express');
const socketIo = require('socket.io');

//custom Imports
const config = require('./configuration');

let app = express();

let server;

let io;


if(config.get('env') === 'production'){

    const options = {
        key: fs.readFileSync(path.join(__dirname, `../../${config.get('server.https.privateKey')}`)),
        cert: fs.readFileSync(path.join(__dirname, `../../${config.get('server.https.certificate')}`))
    };

    //create https server
    server = https.createServer(options, app);
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
    res.sendFile('/views/index.html');
})

app.set('port', config.get('server.http.port'));

server.listen(app.get('port'), ()=>{
    console.info(`Express server start on port: ${app.get('port')} with PROCESSID ${process.id}`);
    console.info(`Environment: ${config.get('env')}`);
});
