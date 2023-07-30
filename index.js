const { Command } = require('commander');
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const Contacts = require("./db/contacts")

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const allContacts = await Contacts.listContacts()
            return allContacts;

        case 'get':
            const contact = await Contacts.getContactById(id)
            return contact;

        case 'add':
            const newContact = await Contacts.addContact({ name, email, phone })
            return newContact;

        case 'remove':
            const removedContact = await Contacts.removeContact(id)
            return removedContact;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}



invokeAction(argv)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));