import { LATITUDE_DEGREE_KILOMETRE } from './constants';

export function getLocationReport(latitude, longitude, rayon) {
   const offSetLat = rayon / LATITUDE_DEGREE_KILOMETRE;
   const maxLatitude = latitude + offSetLat;
   const minLatitude = latitude - offSetLat;
   const OneLongitudeDegree = LATITUDE_DEGREE_KILOMETRE * Math.cos(latitude * Math.PI / 180);
   const offSetLong = rayon / OneLongitudeDegree;
   return {
      maxLatitude,
      minLatitude,
      maxLongitude: longitude + offSetLong,
      minLongitude: longitude - offSetLong
   }
}

export function Distance(lat1, long1, lat2, long2)
{
    var latitude1 = lat1 * Math.PI / 180;
    var latitude2 = lat2 * Math.PI / 180;
    var longitude1 = long1 * Math.PI / 180;
    var longitude2 = long2 * Math.PI / 180;
    var R = 6371;
    var d = R * Math.acos(Math.cos(latitude1) * Math.cos(latitude2) * Math.cos(longitude2 - longitude1) + Math.sin(latitude1) * Math.sin(latitude2));
    return d;
}

Math.radians = function(degrees) {
   return degrees * Math.PI / 180;
 };

export function distanceTwo(lat1, lon1, lat2, lon2) {
var R = 6371000; // metres
var φ1 = Math.radians(lat1);
var φ2 = Math.radians(lat2);
var Δφ = Math.radians(lat2-lat1);
var Δλ = Math.radians(lon2-lon1);

var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

var d = R * c;
return d;
}

export function parseUniqueTypeObject(obj, type) {
   Object.keys(obj).forEach(key => {
      if (obj[key] != typeof(type))
         return false;
   })
   return true;
}

export function sortObjectByAsc(obj, key) {
   obj.sort((a, b) => a[key] - b[key])
}

export function isExistInArray(array, value) {
   const result = array.find(element => element === value);

   if (result)
      return true;
   return false;
}

export function checkLongAndLat(longitude, latitude) {
   if (latitude > 90 || latitude < -90 || longitude > 180 || longitude < -180)
      return true;
   return false;
}