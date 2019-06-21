import React from 'react';

export default function useGetReport(latitude, longitude, sort) {
   const [ reports, setReports ] = React.useState([]);

   React.useEffect(() => {
      const getReport = async () => {
         if (!latitude || !longitude)
            return [];
         const response = await fetch('/report/' + latitude + '/' + longitude + '/' + sort);
         const body = await response.json();
         if (response.status !== 200) 
            throw Error(body.message);
         return body;
      }
      getReport()
         .then(res => setReports(res))
         .catch(err => {
            console.log(err);
            setReports([]);
         })
   }, [latitude, longitude, sort])

   return reports;
}