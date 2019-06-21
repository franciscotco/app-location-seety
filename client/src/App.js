import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import ReportView from './components/ReportView';
import ReportList from './components/ReportList';
import NavTopBar from './components/NavTopBar';

// Constant
import {ROOT, VIEW_REPORT, LIST_REPORT} from './constants';

// Style
import './App.css';

function NoMatch() {
  return (
     <div>
        NoMatch
        <br />
        <a href="/">
           Back to Home
        </a>
     </div>
  )
}

class App extends React.Component {
  render() {
    return (
      <div>
        <NavTopBar />
        <Router>
              <Switch>
                <Route exact path={ROOT} component={ReportView}/>
                <Route path={VIEW_REPORT} component={ReportView}/>
                <Route path={LIST_REPORT} component={ReportList}/>
                <Route component={NoMatch}/>
              </Switch>
        </Router>
      </div>
    );
  }
}

export default App;