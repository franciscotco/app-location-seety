import React from 'react';

// Component
import useGetReport from './useGetReport';
import useLocation from './useLocation';

// Constant
import { TITLE, TIME, LONGITUDE, LATITUDE, DISTANCE } from '../constants';

export const destruct = (keys, obj) => keys.reduce((a, c) => obj[c], {});

const DisplayColumn = ({data, style}) => <div className={`column-report-list ${style}-report-list`}>{data}</div>;

const columnTitle = (props) => {
   // const title = destruct([TITLE], props);

   console.log("Props :", props);
   return <DisplayColumn data={props} style={props} />;
}

const columnTime = (props) => {
   return <DisplayColumn data={props} style={props} />;
}

const columnLatitude = (props) => {
   return <DisplayColumn data={props} style={props} />;
}

const columnLongitude = (props) => {
   return <DisplayColumn data={props} style={props} />;
}

const headerNames = {
   [TITLE]: "Title",
   [TIME]: "Time",
   [LONGITUDE]: "Longitude",
   [LATITUDE]: "Latitude"
}

const HeaderReportList = ({setSort}) => {
   const headers = [];

   const handleOnClick = (sort) => () => {
      if (sort === LONGITUDE || sort === LATITUDE)
         setSort(DISTANCE);
      else
         setSort(sort)
   };

   Object.keys(fields).forEach(key => {
      const header = <div key={key} onClick={handleOnClick(key)}>{headerNames[key]}</div>
      if (headerNames[key])
         headers.push(header);
   })
   return headers;
}

const fields = {
   [TITLE]: columnTitle,
   [TIME]: columnTime,
   [LONGITUDE]: columnLongitude,
   [LATITUDE]: columnLatitude,
}

export default function ReportList() {
   const [ sort, setSort ] = React.useState(TIME);
   const location = useLocation();
   const reports = useGetReport(location.latitude, location.longitude, sort);
   console.log("Reports :", reports);
   return (
      <div>
         <HeaderReportList setSort={setSort}/>
         {reports.map(elem => {
            const { _id } = elem;
            const row = [];

            Object.keys(elem).forEach(key => {
               if(fields[key])
                  row.push(fields[key](elem[key]))
            })
            return <div key={_id}>{row}</div>;
         })}
      </div>
   );
}