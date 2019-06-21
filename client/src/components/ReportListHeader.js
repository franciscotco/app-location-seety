import React from 'react';

// Constant
import { TITLE, TIME, LONGITUDE, LATITUDE, POSITION } from '../constants';
import { fields } from './ReportList';

// Style
import './ReportList';

const columnHeader = (text, key, handleOnClick) => <div key={text} onClick={handleOnClick(key)} className={`column-report-list ${key}-report-list header-report-list`}>{text}</div>;

const headerNames = {
   [TITLE]: "Title",
   [TIME]: "Time",
   [LONGITUDE]: "Longitude",
   [LATITUDE]: "Latitude",
}

export default function HeaderReportList({setSort}) {
   const headers = [];

   const handleOnClick = (sort) => () => {
         setSort(sort)
   };

   Object.keys(fields).forEach(key => {
      if (key === POSITION) {
         headers.push(columnHeader(headerNames[LONGITUDE], POSITION, handleOnClick));
         headers.push(columnHeader(headerNames[LATITUDE], POSITION, handleOnClick));
      } else {
         if (headerNames[key])
            headers.push(columnHeader(headerNames[key], key, handleOnClick))
      }
   })
   return <div className="row-report-list">{headers}</div>;
}