import React from 'react';

export default function useGetReport(latitude, longitude) {
   const [ reports, setReports ] = React.useState([]);

   React.useEffect(() => {
      const getReport = async () => {
         if (!latitude || !longitude)
            return setReports([]);
         const response = await fetch('/report/' + latitude + '/' + longitude + '/time');
         const body = await response.json();
         if (response.status !== 200) throw Error(body.message);
       
         return body;
      }
      getReport()
         .then(res => setReports(res))
         .catch(err => {
            console.log(err);
            setReports([]);
         })
   }, [latitude, longitude])

   return reports;
}