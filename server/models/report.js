import mongoose from 'mongoose';

// Constant
import { TIME, TITLE } from '../constants';

const Coordinates = new mongoose.Schema({
   longitude: {
      type: Number,
      required: true,
   },
   latitude: {
      type: Number,
      required: true,
   }
})

const reportSchema = new mongoose.Schema({
   position: {
      type: Coordinates,
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