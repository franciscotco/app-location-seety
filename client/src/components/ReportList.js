import React from 'react';

// Component
import useGetReport from './useGetReport';
import useLocation from './useLocation';
import ReportListHeader from './ReportListHeader';

// Constant
import { TITLE, TIME, POSITION, COORDINATES } from '../constants';

// Style
import './ReportList.css';

export const destruct = (keys, obj) => keys.reduce((a, c) => obj[c], {});

const DisplayColumn = ({data, style}) => <div className={`column-report-list ${style}-report-list`}>{data}</div>;

const columnTitle = (props) => {
   return <DisplayColumn key={props} data={props} style={TITLE} />;
}

const columnTime = (props) => {
   const date = new Date(props);

   return <DisplayColumn key={props} data={date.toLocaleString()} style={TIME} />;
}

const columnLatitude = (props) => {
   return <DisplayColumn key={props} data={props} style={POSITION} />;
}

const columnLongitude = (props) => {
   return <DisplayColumn key={props} data={props} style={POSITION} />;
}

const columnPosition = (props) => {
   const coordinates = destruct([COORDINATES], props);
   const longitude = coordinates[0];
   const latitude = coordinates[1];

   return [
      columnLongitude(longitude),
      columnLatitude(latitude)
   ]
}

export const fields = {
   [TITLE]: columnTitle,
   [TIME]: columnTime,
   [POSITION]: columnPosition,
}

export default function ReportList() {
   const [ sort, setSort ] = React.useState(TIME);
   const [ refresh, setRefresh ] = React.useState(false);
   const location = useLocation(false);
   const reports = useGetReport(location.latitude, location.longitude, sort, refresh);

   if (!reports) {
      setRefresh(!refresh);
      return null;
   }

   return (
      <div>
         <ReportListHeader setSort={setSort}/>
         {reports.map(elem => {
            const { _id } = elem;
            const row = [];

            Object.keys(elem).forEach(key => {
               if(fields[key])
                  row.push(fields[key](elem[key]))
            })
            return <div key={_id} className="row-report-list">{row}</div>;
         })}
      </div>
   );
}