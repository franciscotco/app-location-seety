import React from 'react';
import useLocation from './useLocation';

// Style
import './ReportView.css';

export default function ReportView() {
   const [ title, setTitle ] = React.useState("");
   const location = useLocation(false);
   const [ message, setMessage ] = React.useState(null);

   const handleInputText = (e) => setTitle(e.target.value);

   const postForm = async () => {
      if (!location)
         return setMessage("Enable geolocation and refresh !");
      const response = await fetch('/report', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ title, lat: location.latitude, long: location.longitude }),
      });
      const body = await response.json();
      if (response.status !== 200) {
         setMessage(body.message);
         throw Error(body.message);
      }
      setMessage(renderValidForm(body.title, body.position.coordinates[0], body.position.coordinates[1]));
      setTitle("");
   }

   const handleSubmitForm = async (e) => {
      e.preventDefault();

      postForm().catch(err => console.log(err));
   };

   const renderValidForm = (title, longitude, latitude) => {
      return (
         <div>
            Create new position : <strong>{title}</strong>
            <ul>
               <li>Longitude : <strong>{longitude}</strong></li>
               <li>Latitude : <strong>{latitude}</strong></li>
            </ul>
         </div>
      );
   }

   return (
      <div className="container-report-view">
         <div>Post Report</div>
         <div className="form-report-view">
            <div className="element-form-report-view">
               Title: <input type="text" onChange={handleInputText} value={title}/>
            </div>
            <div className="element-form-report-view">
               <div role="button" onClick={handleSubmitForm} className="submit-report-view">Submit</div>
            </div>
         </div>
         <div>{message}</div>
      </div>
   );
}