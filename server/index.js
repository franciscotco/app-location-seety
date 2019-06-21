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

const eraseDatabaseOnSync = false;

const port = process.env.PORT || 5000;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await models.Report.deleteMany({});
    console.log("DELETE")
  }
  app.listen(port, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
}).catch(err => {
  console.log(err);
  process.exit(1);
});