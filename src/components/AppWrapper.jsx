import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';

import App from '../containers/App';

const AppWrapper = () => {
  return (
    <div>
      <Router>
        <App />
      </Router>
    </div>
  );
};

export default AppWrapper;
