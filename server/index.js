import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';
import models, { connectDb } from './models';

import 'dotenv/config';

export { connectDb };

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/report', routes.report);

const eraseDatabaseOnSync = true;

const port = process.env.PORT || 3000;

app.get('/api/hello', (req, res) => {
   res.send({ express: 'Hello From Express' });
 });

 app.post('/api/world', (req, res) => {
   console.log(req.body);
   res.send(
     `I received your POST request. This is what you sent me: ${req.body.post}`,
   );
 });

connectDb().then(() => {
  if (eraseDatabaseOnSync) {
    console.log("DELETE")
  }
  app.listen(port, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});