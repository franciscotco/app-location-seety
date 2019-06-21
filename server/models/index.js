import mongoose from 'mongoose';

import Report from './report';

import 'dotenv/config';

const connectDb = () => {
   return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, (error, client) => {
      if (error) throw error;
      return client;
   });
 };
 
const models = { Report };
 
export { connectDb };
export default models;