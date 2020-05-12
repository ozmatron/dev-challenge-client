import React from 'react';
import './App.css';
import Login from './components/login.js';
import SignUpForm from './components/signup.js';
import Members from './components/members.js';
import News from './pages/news-page.js';
import Winners from './pages/winners.js';
import TasksPage from './pages/tasks-page.js';
import { Route, Switch } from "react-router-dom";
import ImageUpload from './pages/image-page.js';

function App() {

  return (
    <main>
      <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/signup" component={SignUpForm} exact />
          <Route path="/members" component={Members} />
          <Route path="/news" component={News} />
          <Route path="/winners" component={Winners} />
          <Route path="/tasks" component={TasksPage} />
          <Route path="/image" component={ImageUpload} />
          <Route component={Error} />
      </Switch>
    </main>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
