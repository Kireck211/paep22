const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    minlength: 3,
    required: true
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: {
      validator: (email) => {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  locations: {
    type: Array
  },//[{type: mongoose.Types.ObjectId, ref: 'Location'}],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  }
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next(); // if you don't want to save the user do not call next
});

userSchema.post('save', function(doc, next) {
  console.log(doc);
  next()
});

const User = mongoose.model('User', userSchema);

module.exports = User;
