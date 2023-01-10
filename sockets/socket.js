const { Socket } = require('socket.io');
const { io } = require('../index');
//almacenar el id de los usuarios conectados
const usuarios = [] ;

// Mensajes de Sockets
io.on('connection', client => {
    //mostrar el id del cliente y el correo del extraheder
    extraheders = client.handshake.headers;
    payload = extraheders.payload;

    console.log('Cliente conectado  '+ client.id+ `correo: ${payload}`);
    
    io.emit('id',{'idsocket':client.id});

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        //borrar el id del usuario
        delete usuarios[client.id];
    });

    //escuchar el evento: 'guardar-socket'guardar el id del socket del usuario
    client.on('guardar-socket', (payload) => {
        console.log('guardar-socket', payload);
        //almacenar el id del socket del usuario como un objeto de usuarios id :payload.id con la condiciones que el id no sea nulo
        if (payload.id!=null) {
            // verificar si el id del usuario ya existe en el objeto de usuarios
            const existe = usuarios.find(usuario => usuario.id === payload.id);
            if (existe) {
                // si existe el id del usuario en el objeto de usuarios
                // actualizar el id del socket del usuario y orrar el id del socket anterior
                
                //buscar el id del usuario en el objeto de usuarios

                const index = usuarios.findIndex(usuario => usuario.id === payload.id);
                //actualizar el id del socket del usuario
                usuarios[index].idsocket = client.id;

            }else{
                // si no existe el id del usuario en el objeto de usuarios
                // guardar el id del socket del usuario

            const usuario = {
                id:payload.id,
                idsocket:client.id
            };
            usuarios.push(usuario);
            console.log(usuarios,'este es el objeto de usuarios ========================');
        }
        }else{
            console.log('no se guardo el id del socket');
            // emitir un evento para que el usuario sepa que no se guardo el id del socket
            io.to(client.id).emit('error-guardar-socket', {'error':'no se guardo el id del socket'});
        
        }
    });

    client.on('mensaje', ( payload ) => {
        console.log('mensaje', payload, client.id);
        

        io.emit( 'mensaje', payload );

    });
    

    //mensajes privados
    client.on('mensaje-privado', ( payload ) => {

        //extraer el id del usuario
        const idp = payload.para;
        //buscar el id del usuario en el objeto de usuarios
        // ciclo que recorra el objeto de usuarios
        console.log('idp', idp);
        const socketId = usuarios.find(usuario => usuario.id === idp).idsocket;
        console.log(`existe el usuario y su id es: ${socketId}`);
        //enviar el mensaje a ese usuario
        io.to(socketId).emit('driver-accept', payload);
        console.log('mensaje-privado', payload,'mensaje enviado');
        
        
    });
    

});