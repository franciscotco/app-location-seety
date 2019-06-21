import mongoose from 'mongoose';

// Constant
import { TIME, TITLE, POSITION } from '../constants';

const pointSchema = new mongoose.Schema({
   type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
})

const reportSchema = new mongoose.Schema({
   [POSITION]: {
      type: pointSchema,
      required: true,
   },
   [TITLE]: {
      type: String,
      required: true,
   },
   [TIME]: {
      type: Date,
      required: true,
   }
});

const Report = mongoose.model('Report', reportSchema);

export default Report;