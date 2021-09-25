import useFetch from './hooks/useFetch';
import Card from './components/Card';
import GhibliLogo from './studio-ghibli-logo.svg';
import Wave from './wave.svg';
import './App.css';

const url = `https://ghibliapi.herokuapp.com/films`;

function App() {
  const { data, error } = useFetch(url);

  return error ? 
  (
    <div>
      <h1>Oops! An error occured.</h1>
    </div>
  )
  : (
    <div>
      <div className="waves">
        <img src={Wave} alt='coloured wave shape' className="wave" />
      </div>
      <img src={GhibliLogo} alt="Studio Ghibli Logo" className="logo" />
      <Card data={data} />
    </div>
  );
}

export default App;
