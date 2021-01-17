class Contacts {
    constructor(){
        this.contacts =[]
    }
    // get all contacts
    getAllContacts(){
        return this.contacts
    }
    // get single contact
    getConstactsById(id){
        return this.contacts.find(contacts => contacts.id === id)
    }
    // create contacts
    createContact(contact){
        contact.id = this.contacts.length + 1
        this.contacts.push(contact)
        return contact 
    }
    // update contact by id
    updateContactById(id, updateContact){
        let index = this.contacts.findIndex(contact => contact.id === id)

        this.contacts[index].name = updateContact.name || this.contacts[index].name
        this.contacts[index].phone = updateContact.phone || this.contacts[index].phone
        this.contacts[index].email = updateContact.email || this.contacts[index].email

        return this.contacts[index]
    }
    // delete contact by id    
    deleteContactById(id) {
        let index = this.contacts.findIndex(contact => contact.id === id)
        let deleteObject = this.contacts[index]
        this.contacts = this.contacts.filter(contact => contact.id !== id)

        return deleteObject
    }
}
module.exports = new Contacts()