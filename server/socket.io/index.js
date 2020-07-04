

module.exports = (io) => {

    let connections = [];
    let users = [];

    io.sockets.on('connection', function (socket) {

        connections.push(socket);
        console.log('Connected: %s sockets connected', connections.length);


        //Disconnect
        socket.on('disconnect', function (data) {
            // if(!socket.username) return;

            users.splice(users.indexOf(socket.username), 1);
            updateUsernames();

            connections.splice(connections.indexOf(socket), 1);
            console.log('Disconnected: %s sockets connected', connections.length);
        })


        //Send message
        socket.on('send message', function(data){
            io.sockets.emit('new message', {msg: data, user: socket.username})
        })

        //New user
        socket.on('new user', function(data, callback){
            callback(true);
            socket.username = data;
            users.push(socket.username);
            updateUsernames();
        });

        function updateUsernames(){
            io.sockets.emit('get users', users)
        }
    })
}