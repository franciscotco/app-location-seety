
/**
*** Mongo
**/

export const COLLECTION_NAME = "reports";

/** 
*** Models
**/

// Report
export const TIME = "time";
export const TITLE = "title";
export const POSITION = "position";


/**
*** Controllers
**/

export const KEY_DISTANCE = "distance";

// Sort
export const SORT_BY_TIME = TIME;
export const SORT_BY_DISTANCE = POSITION;
export const SORT_BY_TITLE = TITLE;
export const SORT_KEYS = [SORT_BY_TIME, SORT_BY_TITLE, SORT_BY_DISTANCE];

// GEOLOCATION DATA
export const LATITUDE_DEGREE_KILOMETRE = 111110;
export const RAYON = 10000;
export const METERS_PER_MILE = 1609.34

/**
*** Error message
**/

export {
   ERROR_GET_REPORT_WRONG_PARAM,
   ERROR_POST_REPORT_WRONG_PARAM,
   ERROR_WRONG_LAT_LONG,
   ERROR_WRONG_SORT_KEY,
   ERROR_SERVER
} from '../controllers/report';