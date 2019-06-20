import mongoose from 'mongoose';
const Report = require('../models/report.js');
import models from '../models';

// Utils
import { getLocationReport, distanceTwo, sortObjectByAsc, isExistInArray } from '../utils';

// Constant
import { RAYON, COLLECTION_NAME, SORT_BY_PROXIMITY, KEY_DISTANCE, SORT_KEYS} from '../constants';

function sortReports(reports, sort) {
   switch(sort){
      case SORT_BY_PROXIMITY:
         return sortObjectByAsc(reports, KEY_DISTANCE)
      default:
         return reports;
   }
}

export const getCloseReports = (req, res) => {
   const { lat, long, sort } = req.params;
   const latitude = parseFloat(lat);
   const longitude = parseFloat(long);
   if (!latitude || ! longitude || !sort) {
      return res.status(400).send({
         message: "Error: Wrong params value {lat: number / long: number / sort: string}"
     });
     }

   if (!isExistInArray(SORT_KEYS, sort))
   return res.status(400).send({
      message: `Error: Wrong param {sort} only take [${SORT_KEYS}]`
  });
  const coordinatesInterval = getLocationReport(latitude, longitude, RAYON);
   mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, (error, client) => {
     const reports = client.collection(COLLECTION_NAME);
     if (!reports)
      return res.status(500).send({ message: "Error: Occurred while getting the Reports."});
      reports.aggregate([
         {$match: {
            "position.longitude": { 
               $gt: coordinatesInterval.minLongitude, 
               $lt: coordinatesInterval.maxLongitude 
            },
            "position.latitude": {
               $gt: coordinatesInterval.minLatitude, 
               $lt: coordinatesInterval.maxLatitude 
            }
         }},
         {$sort: {[sort]: 1}},
         {$project: {
            title: 1,
            time: 1,
            "position.latitude": 1,
            "position.longitude": 1
         }}
      ]).toArray()
      .then((resultat) => {
         console.log("Resultat :", resultat);
         return resultat
      })
      .then((resultat) => {
         const parsedResult = [];

         if (resultat) {
         resultat.forEach(elem => {
            console.log("Elem :", elem);
            const { position } = elem;
            const distance = distanceTwo(latitude, longitude, position.latitude, position.longitude);
            console.log("Distance :", distance);
            if (distance <= RAYON) {
               elem[KEY_DISTANCE] = distance;
               parsedResult.push(elem);
            }
         })
         sortReports(parsedResult, sort);
      }
         return parsedResult;
      })
      .then((parsedResult) => res.send(parsedResult))
      .catch(err => {console.log(err); res.status(500).send({
         message: err.message || "Error: occurred while getting the Reports."
     });})
  })
}

export const postReport = (req, res) => {
   const { title, lat, long } = req.body;

   if(!req.body || !req.body.title || !req.body.lat || !req.body.long) {
      return res.status(400).send({
          message: "Error: post request require {title: string, lat: number, long: number}"
      });
  }
  const latitude = parseFloat(lat);
   const longitude = parseFloat(long);
   console.log("Hello !!", lat, long)
   if (!latitude || !longitude) {
      return res.status(400).send({
         message: "Error: Wrong input value {lat: number, long: number}"
     });
     }
   console.log("BODY :", req.body);
   const report = new models.Report({
      title,
      time: new Date(),
      position: {
        longitude,
        latitude,
      },
    })
    console.log("Create");

    report.save()
    .then(data => {
         console.log("Data :", data);
         res.send(data);
      })
   .catch(err => {
     console.log("Err :", err);
      res.status(500).send({
          message: err.message || "Error: Occurred while creating the Report."
      });
  });
}