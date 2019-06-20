import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from './logo.svg';

// Components
import ReportView from './components/ReportView';
import ReportList from './components/ReportList';

// Constant
import {ROOT, VIEW_REPORT, LIST_REPORT} from './constants';

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

  // state = {
  //   response: '',
  //   post: '',
  //   responseToPost: '',
  // };

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }
  
  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
    
  //   return body;
  // };

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/world', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });
  //   const body = await response.text();
    
  //   this.setState({ responseToPost: body });
  // };
  
render() {
  return (
    <div>
      <Router>
            <Switch>
              <Route exact path={ROOT} component={ReportList}/>
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


// {/* <div className="App"> */}
//         {/* <header className="App-header">
//            <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header> */}
//         {/* <p>{this.state.response}</p>
//         <form onSubmit={this.handleSubmit}>
//           <p>
//             <strong>Post to Server:</strong>
//           </p>
//           <input
//             type="text"
//             value={this.state.post}
//             onChange={e => this.setState({ post: e.target.value })}
//           />
//           <button type="submit">Submit</button>
//         </form>
//         <p>{this.state.responseToPost}</p>
//       </div> */}