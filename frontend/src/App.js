import './App.css';
import Map from './components/map/Map.jsx'
import NavBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <NavBar />
      <div className="Map">
          <Map />
        </div>
    </div>
  );
}

export default App;
