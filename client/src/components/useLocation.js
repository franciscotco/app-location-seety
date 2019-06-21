import React from 'react';

export default function useLocation(refresh) {
   const [ location, setLocation ] = React.useState({longitude: null, latitude: null});

   React.useEffect(() => {
      navigator.geolocation.getCurrentPosition(location => {
         if (location) {
            setLocation({
               longitude: location.coords.longitude,
               latitude: location.coords.latitude
            })
         }
      });
   }, [refresh]);

   return location;
}