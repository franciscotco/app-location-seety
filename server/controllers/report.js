import mongoose from 'mongoose';
import models from '../models';

// Utils
import { isExistInArray, checkLongAndLat } from '../utils';

// Constant
import { COLLECTION_NAME, SORT_BY_DISTANCE, SORT_KEYS, METERS_PER_MILE, POSITION, TITLE, TIME } from '../constants';

export const ERROR_GET_REPORT_WRONG_PARAM = "Error: Wrong params value {lat: number / long: number / sort: string}";
export const ERROR_POST_REPORT_WRONG_PARAM = "Error: post request require {title: string, lat: number, long: number}";
export const ERROR_WRONG_LAT_LONG = "Error: only accept {[-90 <= latitude <= 90] & [-180 <= longitude <= 180]}";
export const ERROR_WRONG_SORT_KEY = `Error: Wrong param {sort} only take [${SORT_KEYS}]`;
export const ERROR_SERVER = "Error: Occurred while processing the data.";

async function sortReports(reports, sort, latitude, longitude) {
   switch(sort){
      case SORT_BY_DISTANCE:
         return reports.find({ [POSITION]: { $nearSphere: { $geometry: { type: "Point", coordinates: [ longitude, latitude ] }, $maxDistance: 10 * METERS_PER_MILE } } }).toArray();
      default:
         return reports.find({ [POSITION]: { $geoWithin:{ $centerSphere: [ [ longitude, latitude ], 10 / 3963.2 ] } } }).sort({[sort]: 1}).toArray();
   }
}

export const getCloseReports = (req, res) => {
   const { lat, long, sort } = req.params;
   const latitude = parseFloat(lat);
   const longitude = parseFloat(long);

   if (!latitude || ! longitude || !sort)
      return res.status(400).send({
         message: ERROR_GET_REPORT_WRONG_PARAM
      });

   if (checkLongAndLat(longitude, latitude))
      return res.status(400).send({
         message: ERROR_WRONG_LAT_LONG
      })

   if (!isExistInArray(SORT_KEYS, sort))
      return res.status(400).send({
         message: ERROR_WRONG_SORT_KEY
      });

   mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, async (error, client) => {
      const reports = client.collection(COLLECTION_NAME);
      await reports.createIndex({position: "2dsphere"});
      // const METERS_PER_MILE = 1609.34
      // const near = await reports.find({ position: { $nearSphere: { $geometry: { type: "Point", coordinates: [ longitude, latitude ] }, $maxDistance: 10 * METERS_PER_MILE } } }).toArray()
      // console.log("NEAR :", near);
      // const search = await reports.find({ position: { $geoWithin:{ $centerSphere: [ [ longitude, latitude ], 10 / 3963.2 ] } } }).sort({[sort]: 1}).toArray();
      // console.log("Search :", search);
      const reportList = await sortReports(reports, sort, latitude, longitude);
      if (!reportList)
         return res.send([])
      return res.send(reportList);
   }).catch(err => {
      console.log(err);
      res.status(500).send({
         message: ERROR_SERVER
      });
   });
}

export const postReport = (req, res) => {
   const { title, lat, long } = req.body;
   const latitude = parseFloat(lat);
   const longitude = parseFloat(long);

   if (!req.body || !title || !latitude || !longitude)
      return res.status(400).send({
          message: ERROR_POST_REPORT_WRONG_PARAM
      });

   if (latitude > 90 || latitude < -90 || longitude > 180 || longitude < -180)
      return res.status(400).send({
        message: ERROR_WRONG_LAT_LONG
      })
   const report = new models.Report({
      [TITLE]: title,
      [TIME]: new Date(),
      [POSITION]: {
         type: "Point",
         coordinates: [longitude, latitude]
      },
   })

   report.save()
      .then(data => res.send(data))
      .catch(err => {
         console.log("Err :", err);
         res.status(500).send({
            message: ERROR_SERVER
         });
      });
}