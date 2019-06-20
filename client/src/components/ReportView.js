import React from 'react';
import useLocation from './useLocation';

export default function ReportView() {
   const [ title, setTitle ] = React.useState("");
   // const [ location, setLocation ] = React.useState(null);
   const location = useLocation(false);
   const [ message, setMessage ] = React.useState(null);

   // React.useEffect(() => {
   //    console.log("Location Change");
   //    navigator.geolocation.getCurrentPosition(location => setLocation(location));
   // }, []);

   const handleInputText = (e) => setTitle(e.target.value);

   const handleSubmitForm = async (e) => {
      e.preventDefault();

      if (!location)
         return setMessage("Enable geolocation and refresh !");
      // let test;
      // function(location) {
      //    console.log(location.coords.latitude);
      //    console.log(location.coords.longitude);
      //    console.log(location.coords.accuracy);
      //  });
      console.log("Location :", location);
      // console.log("test :", test)
      const response = await fetch('/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({ title, lat: location.latitude, long: location.longitude }),
      });
      const body = await response.json();
      console.log("Reponse :", body);
      setMessage("Create new position : " + body.title + " at latitude:" + body.position.latitude + " and longitude :" + body.position.longitude);
      setTitle("");
   };

   return (
      <div>
         {message}
         Post Report
         <input type="text" onChange={handleInputText} value={title}/>
         <button onClick={handleSubmitForm}>Submit</button>
      </div>
   );
}