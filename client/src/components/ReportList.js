import React from 'react';
import useGetReport from './useGetReport';
import useLocation from './useLocation';

export default function ReportList() {
   const location = useLocation();
   const reports = useGetReport(location.latitude, location.longitude);
   console.log("Reports :", reports);
   return (
      <div>
         Report List
      </div>
   );
}