/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import { model, Schema } from 'mongoose';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },

    lastname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 11,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
  },
  { timestamp: true }
);

userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  if (user.password) {
    const salt = await bcrypt.genSalt(16);
    user.password = await bcrypt.hash(user.password, salt);
  }
  return user;
});

userSchema.methods.generateAuthToken = async function() {
  return sign(
    { sub: this._id, firstname: this.firstname, lastname: this.lastname },
    process.env.JWT_SECRET,
  );
};

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.index({ firstname: 'text', lastname: 'text', email: 'text', phone: 'text' });
export default model('User', userSchema);
