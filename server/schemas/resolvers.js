const contacts = [
  { id: '1', name: 'John Doe', address: '123 Main St', email: 'johndoe@example.com' },
  { id: '2', name: 'Jane Smith', address: '456 Elm St', email: 'janesmith@example.com' },
];

const resolvers = {
  Query: {
    contacts: () => contacts,
  },
  Mutation: {
    addContact: (_, { input }) => {
      const newContact = { id: String(contacts.length + 1), ...input };
      contacts.push(newContact);
      return newContact;
    },
    updateContact: (_, { id, input }) => {
      const contactIndex = contacts.findIndex((contact) => contact.id === id);
      if (contactIndex !== -1) {
        contacts[contactIndex] = { ...contacts[contactIndex], ...input };
        return contacts[contactIndex];
      }
      throw new Error('Contact not found');
    },
    deleteContact: (_, { id }) => {
      const contactIndex = contacts.findIndex((contact) => contact.id === id);
      if (contactIndex !== -1) {
        contacts.splice(contactIndex, 1);
        return true;
      }
      throw new Error('Contact not found');
    },
  },
};

module.exports = resolvers;
