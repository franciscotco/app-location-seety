import React from 'react';

// constant
import { URL, LIST_REPORT, VIEW_REPORT } from '../constants';

// Style
import './NavTopBar.css'

export default function NavTopBar() {
   return (
      <div className="container-nav-top-bar">
         <a href={URL + VIEW_REPORT} className="element-nav-top-bar">
            ADD REPORT
         </a>
         <a href={URL + LIST_REPORT} className="element-nav-top-bar">
            SHOW REPORT
         </a>
      </div>
   );
}