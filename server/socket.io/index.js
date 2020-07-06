

module.exports = (io) => {

    let connections = [];
    let users = [];

    io.sockets.on('connection', (socket) => {

        connections.push(socket);
        console.log('Connected: %s sockets connected', connections.length);


        //Disconnect
        socket.on('disconnect', (data) => {
            // if(!socket.username) return;

            users.splice(users.indexOf(socket.username), 1);
            updateUsernames();

            connections.splice(connections.indexOf(socket), 1);
            console.log('Disconnected: %s sockets connected', connections.length);
        })


        //Send message
        socket.on('send message', (data) =>{
            io.sockets.emit('new message', {msg: data, user: socket.username})
        })

        //Send message
        socket.on('send image url', (data) =>{
            io.sockets.emit('new image', {image_url: data, user: socket.username})
        })

        //New user
        socket.on('new user', (data, callback) =>{
            callback(true);
            socket.username = data;
            users.push(socket.username);
            updateUsernames();
        });
    })

    function updateUsernames(){
        io.sockets.emit('get users', users)
    }
}