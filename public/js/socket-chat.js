var socket = io();

var params = new URLSearchParams( window.location.search);

if( !params.has('name') || !params.has('room') ){
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var user = {
    name: params.get('name'),
    room: params.get('room')    
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enterChat', user, function( resp ){
        //console.log('Usuarios conectados: ', resp);
        renderUsers( resp );
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('createMessage', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMessage', function(message) {

    // console.log('Servidor:', message);
    renderMessages( message, false );
    scrollBottom();

});

//When a user enters or leaves the chat
socket.on('peopleList', function(people) {

    //console.log('Servidor:', people);
    renderUsers( people );

});

// Private messages
socket.on('privateMessage', function( message ) {

    console.log('Mensaje privado: ', message);

});

