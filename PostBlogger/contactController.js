const contacts = require('./Contacts')
// import contacts from './Contacts.js'

exports.getAllContacts = (req, res) => {
    res.json(contacts.getAllContacts())
}

exports.createContact = (req, res) => {
    let {name,phone,email} = req.body;
    let contact= contacts.createContact({
        name,
        phone,
        email
    })
    res.json(contact)
}