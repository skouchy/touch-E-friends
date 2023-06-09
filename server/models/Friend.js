const { Schema } = require('mongoose');

const friendSchema = new Schema({
  name: {
    type: String,
    // required: 'You need to include a name!',
    minlength: 1,
    maxlength: 100
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, 'Must use a valid email address']
  },
  phone: {
    type: String,
    match: [/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, 'Please input a valid phone number']
  },
  address: {
    type: String
  }
});

// const Friend = model('Friend', friendSchema);

module.exports = friendSchema;
