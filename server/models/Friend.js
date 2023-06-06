const { Schema, model } = require('mongoose');

const friendSchema = new Schema({
  name: {
    type: String,
    required: 'You need to include a name!',
    minlength: 1,
    maxlength: 100
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
  },
  address: {
    type: String
  }
});

const Friend = model('Friend', friendSchema);

module.exports = Friend;
