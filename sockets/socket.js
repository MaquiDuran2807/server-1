const { Socket } = require('socket.io');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado  '+ client.id+ typeof(client.id));

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
   

    client.on('mensaje', ( payload ) => {
        console.log('mensaje', payload, client.id);
        

        io.emit( client.id, payload );

    });


});
