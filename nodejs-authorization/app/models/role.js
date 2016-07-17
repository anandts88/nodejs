import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import connection from '../database';

const { Schema } = mongoose;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  }
}, {
  timestamps: true,
  strict: false
});

RoleSchema.plugin(autoIncrement.plugin, 'Role');

if (!RoleSchema.options.toJSON) {
  RoleSchema.options.toJSON = {};
}

RoleSchema.options.toJSON.transform = (doc, ret) => {
  delete ret.__v;
};

if (!RoleSchema.options.toObject) {
  RoleSchema.options.toObject = {};
}

RoleSchema.options.toObject.transform = (doc, ret) => {
  delete ret.__v;
};

export default connection.model('Role', RoleSchema);
