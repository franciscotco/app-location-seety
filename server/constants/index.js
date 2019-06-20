
/**
*** Mongo
**/

export const COLLECTION_NAME = "reports";

/** 
*** Models
**/

// Attributes
export const TIME = "time";
export const TITLE = "title";



/**
*** Controllers
**/

export const KEY_DISTANCE = "distance";

// Sort
export const SORT_BY_TIME = TIME;
export const SORT_BY_DISTANCE = KEY_DISTANCE;
export const SORT_BY_TITLE = TITLE;
export const SORT_KEYS = [SORT_BY_TIME, SORT_BY_TITLE, SORT_BY_DISTANCE];

export const LATITUDE_DEGREE_KILOMETRE = 111110;
export const RAYON = 10000;