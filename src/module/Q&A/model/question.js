/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import { model, Schema } from 'mongoose';
import Answer from './answer';

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      minlength: 5,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    vote: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamp: true }
);

questionSchema.pre('remove', async function(next) {
  await Answer.remove({ question: this._id }).exec();
  next();
});

questionSchema.index({ question: 'text' });
export default model('Question', questionSchema);
