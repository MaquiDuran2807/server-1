const { Socket } = require('socket.io');
const { io } = require('../index');
const { clients } = require('../index');
//almacenar el id de los usuarios conectados
let usuarios ;
// Mensajes de Sockets
io.on('connection', client => {
    //mostrar el id del cliente y el correo del extraheder
    extraheders = client.handshake.headers;
    payload = extraheders.payload;

    console.log('Cliente conectado  '+ client.id);
    
    io.emit('id',{'idsocket':client.id});

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        //borrar el id del usuario
    });

    //escuchar el evento: 'guardar-socket'guardar el id del socket del usuario
    

    //mensajes privados
    client.on('mensaje-privado', async ( payload ) => {

        //extraer el id del usuario
        const idpara = payload.para;
        //buscar el id del usuario en el objeto de usuarios
        // ciclo que recorra el objeto de usuarios
        console.log('idp', idpara);
        const socketId = await clients.get(idpara);
        console.log(`existe el usuario y su id es: ${socketId}`);
        //enviar el mensaje a ese usuario
        io.to(socketId).emit('driver-accept', payload);
        console.log('mensaje-privado', payload,'mensaje enviado');
        
        
    });
    

});