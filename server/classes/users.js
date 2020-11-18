

class Users {

    constructor (){
        this.people = [];
    }

    addPerson (id, name, room){
        let person = { id, name, room };

        this.people.push(person);

        return this.people;
    }

    getPerson( id ){
        let person = this.people.filter( person => person.id === id )[0];
        return person;
    }

    getPeople() {
        return this.people;
    }

    getPersonByChatroom( chatroom ){
        let peopleInChatroom = this.people.filter( person =>  person.room === chatroom);
        return peopleInChatroom;
    }

    deletePerson(id){

        let deletedPerson = this.getPerson(id);

        this.people = this.people.filter( person => person.id !== id );
    
        return deletedPerson;
    
    }
}


module.exports = {
    Users
}