import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Movie from './components/Movie';
import Card from './components/Card';
import GhibliLogo from './studio-ghibli-logo.svg';
import Wave from './wave.svg';
import './App.css';

function App() {
  return (
    <div>
      <div className="waves">
        <img src={Wave} alt='coloured wave shape' className="wave" />
      </div>
      <Router>
        <Link to="/">
          <img src={GhibliLogo} alt="Studio Ghibli Logo" className="logo" />
        </Link>
        <Switch>
          <Route path="/" exact component={Card} />
          <Route path="/details/:filmTitle/:filmYear" component={Movie} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
