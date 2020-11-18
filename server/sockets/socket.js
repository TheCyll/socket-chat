const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utilities');

const users = new Users(); 

io.on('connection', (client) => {

    client.on('enterChat', (user, callback) => {

        
        if( !user.name || !user.room ){
            return callback({
                err: true,
                message: 'El nombre y sala son necesarios'
            });
        }

        client.join( user.room );

        users.addPerson( client.id, user.name, user.room);

        client.broadcast.to(user.room).emit('peopleList', users.getPersonByChatroom(user.room) );
        client.broadcast.to(user.room).emit('createMessage', createMessage('Administrador', `${ user.name } se unió`));

        return callback(users.getPersonByChatroom(user.room));
    });  

    client.on('createMessage', (data, callback) => {

        let person = users.getPerson(client.id);

        let message = createMessage( person.name, data.message );
        client.broadcast.to(person.room).emit( 'createMessage', message);

        callback( message );
   
    });

    client.on('disconnect', () => {

        let deletedPerson = users.deletePerson( client.id );

        client.broadcast.to(deletedPerson.room).emit('createMessage', createMessage('Administrador', `${ deletedPerson.name } ha salido del chat`));
        client.broadcast.to(deletedPerson.room).emit('peopleList', users.getPersonByChatroom(deletedPerson.room));

    });

    // Private messages
    client.on('privateMessage', data => {

        if(!data.message){
            console.log('Escribe un mensaje');
        }else{

            let person = users.getPerson( client.id );
            client.broadcast.to(data.to).emit('privateMessage', createMessage( person.name, data.message ));
        
        } 

    });
    

});