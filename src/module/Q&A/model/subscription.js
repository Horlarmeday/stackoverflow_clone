/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import { model, Schema } from 'mongoose';

const subscriptionSchema = new Schema(
  {
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },

    user: {
      type: new Schema({
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
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
          lowercase: true,
        },
      }),
      required: true,
    },
  },
  { timestamp: true }
);

export default model('Subscription', subscriptionSchema);
