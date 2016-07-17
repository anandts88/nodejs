import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import passportLocalMongoose from 'passport-local-mongoose';
import connection from '../database';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 150
  },

  password: {
    type: String,
    trim: true,
    maxlength: 150
  },

  role: {
    type: Number,
    ref: 'Role'
  }
}, {
  timestamps: true,
  strict: false
});

UserSchema.plugin(autoIncrement.plugin, 'User');
UserSchema.plugin(passportLocalMongoose);


if (!UserSchema.options.toJSON) {
  UserSchema.options.toJSON = {};
}

UserSchema.options.toJSON.transform = (doc, ret) => {
  // remove the _id of every document before returning the result
  delete ret.password;
  delete ret.hash;
  delete ret.salt;
  delete ret.__v;
};

if (!UserSchema.options.toObject) {
  UserSchema.options.toObject = {};
}

UserSchema.options.toObject.transform = (doc, ret) => {
  // remove the _id of every document before returning the result
  delete ret.password;
  delete ret.hash;
  delete ret.salt;
  delete ret.__v;
};

export default connection.model('User', UserSchema);
